import { error } from '@sveltejs/kit'
import { prisma } from '$lib/server'

export const load = async ({ params, depends }) => {
	const inludeUser = { include: { user: true } }
	const _case = await prisma.case.findUnique({
		where: { id: params.caseId },
		include: {
			memberAdmin: inludeUser,
			memberInCharge: inludeUser,
			client: true,
			contactImplications: { include: { contact: true, roles: true } }
		}
	})
	if (!_case) throw error(404, 'Cette affaire  introuvable')
	return { case: _case }
}
