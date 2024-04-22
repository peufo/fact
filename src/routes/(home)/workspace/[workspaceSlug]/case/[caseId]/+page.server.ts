import prisma from '$lib/prisma'
import { caseShema } from '$lib/shema'
import { parseFormData } from '$lib/formData'

export const actions = {
	update: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, caseShema)
		if (err) return err

		const _case = await prisma.case.update({
			data,
			where: { id: params.caseId },
		})
		return { case: _case }
	},
	delete: async ({ params }) => {
		// TODO: Archive instead delete
		await prisma.case.delete({
			where: { id: params.caseId },
		})
		return { success: true }
	},
}
