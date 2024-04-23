import { prisma } from '$lib/server'
import { parseFormData } from 'fuma/server'
import { modeContactImplication, modeContactImplicationUpdate } from '$lib/model'
import { error, fail } from '@sveltejs/kit'

export const actions = {
	create: async ({ request, locals: { user }, params: { workspaceId } }) => {
		if (!user) error(401)
		const { data, err } = await parseFormData(request, modeContactImplication)
		if (err) return err

		const _case = await prisma.case.findUniqueOrThrow({
			where: { id: data.case.connect.id },
			select: { clientId: true }
		})
		if (_case.clientId === data.case.connect.id)
			return fail(400, {
				issues: [
					{
						path: ['contact'],
						message: 'Ce contact est déjà le client de cette affaire'
					}
				]
			})
		const implication = await prisma.contactImplication.create({
			data: {
				...data,
				creator: { connect: { userId_workspaceId: { userId: user.id, workspaceId } } },
				workspace: { connect: { id: workspaceId } }
			}
		})

		return implication
	},

	update: async ({ request, locals: { user } }) => {
		if (!user) error(401)
		const { data, err } = await parseFormData(request, modeContactImplicationUpdate)
		if (err) return err

		const implication = await prisma.contactImplication.update({
			where: { id: data.id },
			data
		})
		return implication
	}
}
