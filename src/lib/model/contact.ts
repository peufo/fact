import type { Prisma } from '@prisma/client'
import { z, type ZodObj } from 'fuma'

export const modelContact = {
	name: z.string().min(2),
	isMoralPerson: z.boolean(),
	firstName: z.string().optional(),
	attentionTo: z.string().optional(),
	language: z.string().optional().default('fr-ch'),
	country: z.string().optional(),
	zipCode: z.string().min(4).max(4).or(z.string().optional()),
	city: z.string().optional(),
	street: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	web: z.string().optional(),
	greeting: z.string().optional(),
	note: z.string().optional(),
	birthday: z.dateOptional(),
	job: z.string().optional(),
	civilStatus: z.string().optional(),
	partner: z.string().optional(),
	iban: z.string().optional(),
	tva: z.string().optional()
} satisfies ZodObj<Omit<Prisma.ContactCreateInput, 'workspace'>>

export const modeContactImplication = {
	contact: z.relation.connect,
	case: z.relation.connect,
	description: z.string().optional(),
	roles: z.relations.connect
} satisfies ZodObj<Omit<Prisma.ContactImplicationCreateInput, 'workspace'>>

export const modeContactImplicationUpdate = {
	...modeContactImplication,
	id: z.string(),
	roles: z.relations.set
} satisfies ZodObj<Omit<Prisma.ContactImplicationUpdateInput, 'workspace'>>

export const modelContactRole = {
	name: z.string(),
	description: z.string().optional()
} satisfies ZodObj<Omit<Prisma.ContactRoleCreateInput, 'workspace'>>
