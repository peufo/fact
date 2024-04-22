import prisma from '$lib/prisma'
import { contactShema } from '$lib/shema'
import { parseFormData } from '$lib/formData'

export const actions = {
	update: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, contactShema)
		if (err) return err

		const contact = await prisma.contact.update({
			data,
			where: { id: params.contactId },
		})
		return { contact }
	},
	delete: async ({ params }) => {
		await prisma.contact.delete({
			where: { id: params.contactId },
		})
		return { success: true }
	},
}
