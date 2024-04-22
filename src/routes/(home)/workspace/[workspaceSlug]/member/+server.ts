import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, url }) => {
	const search = url.searchParams.get('search') || ''

	const members = await prisma.workspaceMember.findMany({
		include: { user: true },
		where: {
			workspace: { slug: params.workspaceSlug },
			user: { name: { contains: search } },
		},
	})
	return json(members)
}
