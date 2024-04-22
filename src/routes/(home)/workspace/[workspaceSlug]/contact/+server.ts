import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, url }) => {
	const search = url.searchParams.get('search') || ''
	// TODO: const query = url.searchParams.get('query')

	const contacts = await prisma.contact.findMany({
		where: {
			workspace: { slug: params.workspaceSlug },
			OR: [{ name: { contains: search } }, { firstName: { contains: search } }],
		},
	})
	return json(contacts)
}
