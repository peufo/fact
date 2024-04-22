import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
	const member = await prisma.workspaceMember.findUniqueOrThrow({
		include: { user: true },
		where: { id: params.memberId },
	})
	return json(member)
}
