import prisma from '$lib/prisma'
import { parseFormData } from '$lib/formData'
import { contactImplicationShema } from '$lib/shema'
import { getSessionMember } from '$lib/session'
import { fail } from '@sveltejs/kit'

export const actions = {
	create: async ({ request, locals, params }) => {
		const { data, err } = await parseFormData(request, contactImplicationShema)
		if (err) return err

		const member = await getSessionMember(locals, params)
		const _case = await prisma.case.findUniqueOrThrow({
			where: { id: data.caseId },
			select: { clientId: true },
		})
		if (_case.clientId === data.contactId)
			return fail(400, {
				issues: [
					{
						path: ['contactId'],
						message: 'Ce contact est déjà le client de cette affaire',
					},
				],
			})
		const implication = await prisma.contactImplication.create({
			data: {
				...data,
				creatorId: member.id,
				workspaceId: member.workspaceId,
			},
		})

		return implication
	},

	update: async ({ request }) => {
		const { data, err, formData } = await parseFormData(request, contactImplicationShema, {
			arrayOperation: 'set',
		})
		if (err) return err

		const id = formData.id as string

		const implication = await prisma.contactImplication.update({
			where: { id },
			data,
		})
		return implication
	},
}
