import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, url }) => {
	const search = url.searchParams.get('search') || ''
	const ids = url.searchParams.get('ids')

	if (Array.isArray(ids)) {
		const roles = await prisma.contactRole.findMany({ where: { id: { in: ids } } })
		return json(roles)
	}

	const roles = await prisma.contactRole.findMany({
		where: {
			workspace: { slug: params.workspaceSlug },
			OR: [{ name: { contains: search } }, { description: { contains: search } }],
		},
	})
	return json(roles)
}
