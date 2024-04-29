import { prisma } from '$lib/server'

export const load = async ({ params }) => {
	const inludeUser = { include: { user: true } }
	return {
		case: await prisma.case.findUniqueOrThrow({
			where: { id: params.caseId },
			include: {
				memberAdmin: inludeUser,
				memberInCharge: inludeUser,
				client: true,
				contactImplications: { include: { contact: true, roles: true } }
			}
		})
	}
}
