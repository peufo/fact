import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
	const contact = await prisma.contact.findUniqueOrThrow({
		where: { id: params.contactId },
	})
	return json(contact)
}
