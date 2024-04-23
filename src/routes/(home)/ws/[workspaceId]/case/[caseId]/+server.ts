import { prisma } from '$lib/server'
import { json } from '@sveltejs/kit'

export const GET = async ({ params }) => {
	const _case = await prisma.case.findUniqueOrThrow({
		where: { id: params.caseId }
	})
	return json(_case)
}
