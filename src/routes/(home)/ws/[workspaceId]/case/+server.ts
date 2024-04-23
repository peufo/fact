import { prisma } from '$lib/server/prisma'
import { json } from '@sveltejs/kit'

export const GET = async ({ params: { workspaceId }, url }) => {
	const search = url.searchParams.get('search') || ''
	const cases = await prisma.case.findMany({
		where: {
			workspace: { id: workspaceId },
			OR: [{ name: { contains: search } }, { ref: +search || -1 }]
		},
		include: {
			client: true,
			memberInCharge: { include: { user: true } },
			memberAdmin: { include: { user: true } }
		}
	})
	return json(cases)
}
