import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ url, params: { workspaceId } }) => {
	const search = url.searchParams.get('search') || ''
	// TODO: const query = url.searchParams.get('query')

	const contacts = await prisma.contact.findMany({
		where: {
			workspaceId,
			OR: [{ name: { contains: search } }, { firstName: { contains: search } }]
		}
	})
	return json(contacts)
}
