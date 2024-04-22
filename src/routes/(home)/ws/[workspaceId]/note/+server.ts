import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params, url }) => {
	const search = url.searchParams.get('search') || ''
	const notes = await prisma.note.findMany({
		where: {
			workspace: { slug: params.workspaceSlug },
			OR: [{ title: { contains: search } }, { decription: { contains: search } }],
		},
	})
	return json(notes)
}
