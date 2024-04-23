import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ url, params: { workspaceId } }) => {
	const search = url.searchParams.get('search') || ''

	const members = await prisma.workspaceMember.findMany({
		include: { user: true },
		where: {
			workspace: { id: workspaceId },
			user: { username: { contains: search } }
		}
	})
	return json(members)
}
