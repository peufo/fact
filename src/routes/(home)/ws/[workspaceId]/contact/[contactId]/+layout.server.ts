import prisma from '$lib/prisma'

export const load = async ({ params, depends }) => {
	const contact = await prisma.contact.findUniqueOrThrow({
		where: { id: params.contactId },
		include: { cases: true, implications: { include: { case: true, roles: true } } },
	})
	depends('contact')
	return { contact }
}
