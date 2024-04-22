import { prisma } from '$lib/server'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { user } }) => {
	if (!user) throw redirect(302, '/auth')

	const members = await prisma.workspaceMember.findMany({
		where: { userId: user.id },
		include: { workspace: true }
	})
	return { user, members }
}
