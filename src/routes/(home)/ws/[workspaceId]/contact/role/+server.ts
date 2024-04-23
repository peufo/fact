import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ url, params: { workspaceId } }) => {
	const search = url.searchParams.get('search') || ''
	const ids = url.searchParams.get('ids')

	if (Array.isArray(ids)) {
		const roles = await prisma.contactRole.findMany({ where: { id: { in: ids } } })
		return json(roles)
	}

	const roles = await prisma.contactRole.findMany({
		where: {
			workspaceId,
			OR: [{ name: { contains: search } }, { description: { contains: search } }]
		}
	})
	return json(roles)
}
