import { parseFormData, tryOrFail } from 'fuma/server'
import { error } from '@sveltejs/kit'
import { prisma } from '$lib/server'
import { modelContact } from '$lib/model'

export const actions = {
	create: async ({ request, locals: { user }, params: { workspaceId } }) => {
		if (!user) error(401)
		const { data, err } = await parseFormData(request, modelContact)
		if (err) return err

		return tryOrFail(() =>
			prisma.contact.create({
				data: {
					...data,
					creator: { connect: { userId_workspaceId: { userId: user.id, workspaceId } } },
					workspace: { connect: { id: workspaceId } }
				}
			})
		)
	}
}
