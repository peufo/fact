import { prisma } from '$lib/server'

export const load = async ({ parent, params: { workspaceId } }) => {
	const { user } = await parent()

	return {
		casesCount: await prisma.case.count({ where: { workspaceId } }),
		member: await prisma.workspaceMember.findUniqueOrThrow({
			where: {
				userId_workspaceId: {
					userId: user.id,
					workspaceId
				}
			}
		}),
		workspace: await prisma.workspace.findUniqueOrThrow({
			where: { id: workspaceId }
		})
	}
}
