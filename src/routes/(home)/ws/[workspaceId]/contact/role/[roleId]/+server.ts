import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
	const role = await prisma.contactRole.findUniqueOrThrow({
		where: { id: params.roleId }
	})
	return json(role)
}
