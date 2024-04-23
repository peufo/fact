import { parseFormData } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelContactRole } from '$lib/model'

export const actions = {
	create: async ({ request, params: { workspaceId } }) => {
		const { data, err } = await parseFormData(request, modelContactRole)
		if (err) return err

		const role = await prisma.contactRole.create({
			data: {
				...data,
				workspaceId
			}
		})

		return role
	}
}
