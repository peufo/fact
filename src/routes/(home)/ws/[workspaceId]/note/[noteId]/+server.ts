import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
	const member = await prisma.note.findUniqueOrThrow({
		where: { id: params.noteId },
	})
	return json(member)
}
