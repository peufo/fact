import { prisma } from '$lib/server'
import { parseFormData } from 'fuma/server'
import { modelWorkspace } from '$lib/model'

export const actions = {
	update: async ({ request, params: { workspaceId } }) => {
		const { data, err } = await parseFormData(request, modelWorkspace)
		if (err) return err

		const workspace = await prisma.workspace.update({
			where: { id: workspaceId },
			data
		})

		return { workspace }
	}
}
