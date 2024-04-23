import { error, fail } from '@sveltejs/kit'
import { parseFormData, tryOrFail } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelCase } from '$lib/model'

export const actions = {
	create: async ({ request, locals: { user }, params: { workspaceId } }) => {
		if (!user) error(401)

		const { data, err } = await parseFormData(request, modelCase)
		if (err) return err
		return tryOrFail(async () => {
			const caseAlreadyExist = await prisma.case.findFirst({
				where: { workspaceId, ref: data.ref }
			})
			if (caseAlreadyExist)
				return fail(400, {
					issues: [{ path: ['ref'], message: 'Référence déjà prise' }]
				})

			const _case = await prisma.case.create({
				data: {
					...data,
					creator: { connect: { userId_workspaceId: { userId: user.id, workspaceId } } },
					workspace: { connect: { id: workspaceId } }
				}
			})

			return { case: _case }
		})
	}
}
