import z from 'zod'
import type { Prisma, Note } from '@prisma/client'
import { toTuple, type ZodObj } from './utils'

type NoteCreateForm = Omit<Prisma.NoteUncheckedCreateInput, 'id' | 'workspaceId'>
type NoteType = Note['type']
type NoteDirection = NonNullable<Note['direction']>

export const noteTypeLabel: Record<NoteType, string> = {
	note: 'Note',
	document: 'Document',
	task: 'Tâche',
	event: 'Évenement',
	phone: 'Téléphone',
	email: 'Email',
	mail: 'Lettre',
}

export const noteDirectionLabel: Record<NoteDirection, string> = {
	input: 'Entrant',
	output: 'Sortant',
}

const noteForm = {
	title: z.string().min(2),
	type: z.enum(toTuple(noteTypeLabel)).optional(),
	direction: z.enum(toTuple(noteDirectionLabel)).optional(),
	caseId: z.string(),
	decription: z.string().optional().nullable(),
	dueDate: z.union([z.date(), z.string()]).optional().nullable(),
} satisfies ZodObj<NoteCreateForm>

export const noteShema = z.object(noteForm)
