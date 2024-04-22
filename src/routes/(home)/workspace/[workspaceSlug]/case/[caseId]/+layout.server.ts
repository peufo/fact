import prisma from '$lib/prisma'
import { error } from '@sveltejs/kit'
import type { truncate } from 'fs/promises'

export const load = async ({ params, depends }) => {
	depends('case')
	const inludeUser = { include: { user: true } }
	const _case = await prisma.case.findUnique({
		where: { id: params.caseId },
		include: {
			memberAdmin: inludeUser,
			memberInCharge: inludeUser,
			client: true,
			contactImplications: { include: { contact: true, roles: true } },
		},
	})
	if (!_case) throw error(404, 'Cette affaire  introuvable')
	return { case: _case }
}
