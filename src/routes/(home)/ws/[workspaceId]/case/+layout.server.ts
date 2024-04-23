import { prisma } from '$lib/server'

export async function load({ params: { workspaceId } }) {
	return {
		cases: await prisma.case.findMany({
			where: { workspaceId },
			include: {
				client: true,
				memberInCharge: { include: { user: true } },
				memberAdmin: { include: { user: true } }
			}
		})
	}
}
