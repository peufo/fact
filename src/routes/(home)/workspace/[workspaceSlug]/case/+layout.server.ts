import prisma from '$lib/prisma'

export async function load({ params, depends }) {
	depends('case')
	const where = { workspace: { slug: params.workspaceSlug } }
	return {
		cases: await prisma.case.findMany({ where, include: { client: true } }),
	}
}
