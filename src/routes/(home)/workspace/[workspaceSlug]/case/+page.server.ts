import { fail } from '@sveltejs/kit'
import prisma from '$lib/prisma'
import { caseShema } from '$lib/shema'
import { parseFormData } from '$lib/formData'
import { getSessionMember } from '$lib/session'

export const actions = {
	create: async ({ request, locals, params }) => {
		const { data, err } = await parseFormData(request, caseShema)
		if (err) return err

		const member = await getSessionMember(locals, params)
		const refExist = await prisma.case.findFirst({
			where: { workspaceId: member.workspaceId, ref: data.ref },
		})
		if (refExist)
			return fail(400, {
				issues: [{ path: ['ref'], message: 'Non disponible' }],
			})

		const _case = await prisma.case.create({
			data: {
				...data,
				creatorId: member.id,
				workspaceId: member.workspaceId,
			},
		})

		return { case: _case }
	},
}
