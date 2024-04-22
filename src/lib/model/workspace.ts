import type { Prisma } from '@prisma/client'
import { z, type ZodObj } from 'fuma'

export const modelWorkspace = {
	name: z.string().min(2),
	slug: z.string(),
	logo: z.string().optional(),
	gedType: z.string().optional(),
	gedToken: z.string().optional()
} satisfies ZodObj<Prisma.WorkspaceCreateInput>
