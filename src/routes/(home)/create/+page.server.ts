import fs from 'fs/promises'
import { redirect } from '@sveltejs/kit'

import { parseFormData, tryOrFail } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelWorkspace } from '$lib/model'

export const actions = {
	default: async ({ request, locals: { user } }) => {
		if (!user) redirect(302, '/auth')

		const { data, err } = await parseFormData(request, modelWorkspace)
		if (err) return err

		return tryOrFail(
			async () => {
				const workspace = await prisma.workspace.create({ data })
				await prisma.workspaceMember.create({
					data: {
						workspace: { connect: { id: workspace.id } },
						user: { connect: { id: user.id } },
						role: {
							create: {
								name: 'owner',
								workspaceId: workspace.id
							}
						}
					}
				})
				return workspace
			},
			(w) => `/workspace/${w.id}`
		)
	}
}
