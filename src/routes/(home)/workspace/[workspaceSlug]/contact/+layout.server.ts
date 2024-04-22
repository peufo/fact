import prisma from '$lib/prisma'

export const load = async ({ params, depends }) => {
	depends('contact')
	const contacts = await prisma.contact.findMany({
		where: {
			workspace: {
				slug: params.workspaceSlug,
			},
		},
	})
	return { contacts }
}
