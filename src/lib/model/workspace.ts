import z from 'zod'
import type { Prisma } from '@prisma/client'
import type { ZodObj } from './utils'

type WorkspaceCreateForm = Omit<Prisma.WorkspaceUncheckedCreateInput, 'id'>
const workspaceForm = {
	name: z.string().min(2),
	slug: z.string(),
	logo: z.string().optional().nullable(),
	gedType: z.string().optional().nullable(),
	gedToken: z.string().optional().nullable(),
} satisfies ZodObj<WorkspaceCreateForm>

export const workspaceShema = z.object(workspaceForm)
