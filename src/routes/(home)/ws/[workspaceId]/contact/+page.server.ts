import { parseFormData } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelContact } from '$lib/model'
import { error } from '@sveltejs/kit'

export const actions = {
	create: async ({ request, locals: { user }, params: { workspaceId } }) => {
		if (!user) error(401)
		const { data, err } = await parseFormData(request, modelContact)
		if (err) return err

		const contact = await prisma.contact.create({
			data: {
				...data,
				creator: { connect: { userId_workspaceId: { userId: user.id, workspaceId } } },
				workspace: { connect: { id: workspaceId } }
			}
		})

		return contact
	}
}
