import { parseFormData } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelNote } from '$lib/model'
import { error } from '@sveltejs/kit'

export const actions = {
	create: async ({ request, locals: { user }, params: { workspaceId } }) => {
		if (!user) error(401)
		const { data, err } = await parseFormData(request, modelNote)
		if (err) return err
		const note = await prisma.note.create({
			data: {
				...data,
				workspace: { connect: { id: workspaceId } },
				members: {
					connect: { userId_workspaceId: { userId: user.id, workspaceId } }
				}
			}
		})

		return { note }
	}
}
