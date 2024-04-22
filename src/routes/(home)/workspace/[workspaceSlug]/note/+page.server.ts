import { parseFormData } from '$lib/formData'
import prisma from '$lib/prisma'
import { getSessionMember } from '$lib/session.js'
import { noteShema } from '$lib/shema'

export const actions = {
	create: async ({ request, locals, params }) => {
		const { data, err } = await parseFormData(request, noteShema)
		if (err) return err

		const member = await getSessionMember(locals, params)
		const note = await prisma.note.create({
			data: {
				...data,
				workspaceId: member.workspaceId,
				members: {
					connect: { id: member.id },
				},
			},
		})

		return { note }
	},
}
