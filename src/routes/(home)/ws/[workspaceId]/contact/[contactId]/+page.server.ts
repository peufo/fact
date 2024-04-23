import { prisma } from '$lib/server'
import { parseFormData } from 'fuma/server'
import { modelContact } from '$lib/model'

export const actions = {
	update: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, modelContact)
		if (err) return err

		const contact = await prisma.contact.update({
			data,
			where: { id: params.contactId }
		})
		return { contact }
	},
	delete: async ({ params }) => {
		await prisma.contact.delete({
			where: { id: params.contactId }
		})
		return { success: true }
	}
}
