import { error } from '@sveltejs/kit'

import prisma from '$lib/prisma'

export const load = async ({ params, parent, depends }) => {
	depends('workspace')
	const { session } = await parent()
	const userId = session!.user.id

	const workspace = await prisma.workspace.findUnique({
		where: { slug: params.workspaceSlug },
		include: { members: { include: { user: true } } },
	})

	if (!workspace) throw error(404)
	if (!workspace.members.find(({ user }) => user.id === userId)) throw error(401)
	return {
		workspace,
		casesCount: await prisma.case.count({ where: { workspaceId: workspace.id } }),
		member: await prisma.workspaceMember.findFirstOrThrow({
			where: {
				userId,
				workspaceId: workspace.id,
			},
		}),
	}
}
