import z from 'zod'
import type { Prisma, Case } from '@prisma/client'
import { type ZodObj, toTuple } from './utils'

export type CaseCreateForm = Omit<Prisma.CaseUncheckedCreateInput, 'id' | 'tags' | 'workspaceId'>
type CaseState = Case['state']

export const caseStateMap: Record<CaseState, string> = {
	open: 'En cours',
	close: 'Terminé',
	archived: 'Archivé',
}

const caseCreateForm = {
	name: z.string().min(2),
	ref: z.number(),
	state: z.enum(toTuple(caseStateMap)).optional(),
	language: z.string().optional().nullable(),
	openAt: z.union([z.date(), z.string()]).optional().nullable(),
	closeAt: z.union([z.date(), z.string()]).optional().nullable(),
	description: z.string().optional().nullable(),
	createdAt: z.union([z.date(), z.string()]).optional(),
	updatedAt: z.union([z.date(), z.string()]).optional(),
	memberInChargeId: z.string(),
	memberAdminId: z.string().optional().nullable(),
	clientId: z.string(),
} satisfies ZodObj<CaseCreateForm>

export const caseShema = z.object(caseCreateForm)
