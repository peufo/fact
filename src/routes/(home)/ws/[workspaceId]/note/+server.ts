import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ url, params: { workspaceId } }) => {
	const search = url.searchParams.get('search') || ''
	const notes = await prisma.note.findMany({
		where: {
			workspaceId,
			OR: [{ name: { contains: search } }, { content: { contains: search } }]
		}
	})
	return json(notes)
}
