import { parseFormData } from '$lib/formData'
import prisma from '$lib/prisma'
import { contactRoleShema } from '$lib/shema'

export const actions = {
	create: async ({ request, params }) => {
		const { data, err } = await parseFormData(request, contactRoleShema)
		if (err) return err

		const role = await prisma.contactRole.create({
			data: {
				...data,
				workspace: { connect: { slug: params.workspaceSlug } },
			},
		})

		return role
	},
}
