import prisma from '$lib/prisma'
import { contactShema } from '$lib/shema'
import { parseFormData } from '$lib/formData'
import { getSessionMember } from '$lib/session'

export const actions = {
	create: async ({ request, locals, params }) => {
		const { data, err } = await parseFormData(request, contactShema)
		if (err) return err

		const member = await getSessionMember(locals, params)
		const contact = await prisma.contact.create({
			data: {
				...data,
				creatorId: member.id,
				workspaceId: member.workspaceId,
			},
		})

		return contact
	},
}
