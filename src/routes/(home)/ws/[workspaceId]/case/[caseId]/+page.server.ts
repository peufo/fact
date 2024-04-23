import { parseFormData } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelCase } from '$lib/model'

export const actions = {
	update: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, modelCase)
		if (err) return err

		const _case = await prisma.case.update({
			data,
			where: { id: params.caseId }
		})
		return { case: _case }
	},
	delete: async ({ params }) => {
		// TODO: Archive instead delete
		await prisma.case.delete({
			where: { id: params.caseId }
		})
		return { success: true }
	}
}
