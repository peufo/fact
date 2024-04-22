import { z, toTuple, type ZodObj } from 'fuma'
import type { Prisma } from '@prisma/client'
import { CASE_STATE_LABEL } from '$lib/constants'

export const modelCase = {
	name: z.string().min(2),
	ref: z.number(),
	state: z.enum(toTuple(CASE_STATE_LABEL)).optional(),
	language: z.string().optional(),
	openAt: z.dateOptional(),
	closeAt: z.dateOptional(),
	description: z.string().optional(),
	memberInCharge: z.relation.connect,
	memberAdmin: z.relation.connect,
	client: z.relation.connect
} satisfies ZodObj<Omit<Prisma.CaseCreateInput, 'workspace'>>
