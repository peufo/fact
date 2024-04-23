import { json } from '@sveltejs/kit'
import { prisma } from '$lib/server'

export const GET = async ({ params }) => {
	const contact = await prisma.contact.findUniqueOrThrow({
		where: { id: params.contactId }
	})
	return json(contact)
}
