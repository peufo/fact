import { prisma } from '$lib/server'

export const load = async ({ params: { workspaceId } }) => {
	const contacts = await prisma.contact.findMany({
		where: { workspaceId }
	})
	return { contacts }
}
