import type { Prisma } from '@prisma/client'
import { z, toTuple, type ZodObj } from 'fuma'
import { NOTE_DIRECTION_LABEL, NOTE_TYPE_LABEL } from '$lib/constants'

export const modelNote = {
	title: z.string().min(2),
	type: z.enum(toTuple(NOTE_TYPE_LABEL)).optional(),
	direction: z.enum(toTuple(NOTE_DIRECTION_LABEL)).optional(),
	case: z.relation.connect,
	decription: z.string().optional(),
	dueDate: z.union([z.date(), z.string()]).optional()
} satisfies ZodObj<Omit<Prisma.NoteCreateInput, 'workspace'>>
