import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, url }) => {
	const search = url.searchParams.get('search') || ''
	const cases = await prisma.case.findMany({
		where: {
			workspace: { slug: params.workspaceSlug },
			OR: [{ name: { contains: search } }, { ref: +search || -1 }],
		},
	})
	return json(cases)
}
