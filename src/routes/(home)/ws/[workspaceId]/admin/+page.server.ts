import prisma from '$lib/prisma'
import { parseFormData } from '$lib/formData'
import { workspaceShema } from '$lib/shema'

export const actions = {
	update: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, workspaceShema)
		if (err) return err

		const workspace = await prisma.workspace.update({
			data,
			where: { slug: params.workspaceSlug },
		})

		return { workspace }
	},
}
