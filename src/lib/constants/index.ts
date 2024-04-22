import type { CaseState, NoteType, NoteDirection } from '@prisma/client'

export const CASE_STATE_LABEL: Record<CaseState, string> = {
	open: 'En cours',
	close: 'Terminé',
	archived: 'Archivé'
}

export const NOTE_TYPE_LABEL: Record<NoteType, string> = {
	note: 'Note',
	document: 'Document',
	task: 'Tâche',
	event: 'Évenement',
	phone: 'Téléphone',
	email: 'Email',
	mail: 'Lettre'
}

export const NOTE_DIRECTION_LABEL: Record<NoteDirection, string> = {
	input: 'Entrant',
	output: 'Sortant'
}
