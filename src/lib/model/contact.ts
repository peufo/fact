import z from 'zod'
import type { Prisma } from '@prisma/client'
import type { ZodObj } from './utils'

type ContactForm = Omit<Prisma.ContactCreateInput, 'id' | 'workspace' | 'cases' | 'tags'>
const contactCreateForm = {
	name: z.string().min(2),
	isMoralPerson: z.boolean(),
	firstName: z.string().optional().nullable(),
	attentionTo: z.string().optional().nullable(),
	language: z.string().optional().nullable().default('fr-ch'),
	country: z.string().optional().nullable(),
	zipCode: z.string().regex(/\d{4}/).length(4).optional().nullable(),
	city: z.string().optional().nullable(),
	street: z.string().optional().nullable(),
	email: z.string().optional().nullable(),
	phone: z.string().optional().nullable(),
	web: z.string().optional().nullable(),
	greeting: z.string().optional().nullable(),
	note: z.string().optional().nullable(),
	birthday: z.union([z.date(), z.string()]).optional().nullable(),
	job: z.string().optional().nullable(),
	civilStatus: z.string().optional().nullable(),
	partner: z.string().optional().nullable(),
	iban: z.string().optional().nullable(),
	tva: z.string().optional().nullable(),
} satisfies ZodObj<ContactForm>
export const contactShema = z.object(contactCreateForm)

type ContactImplicationForm = Omit<
	Prisma.ContactImplicationUncheckedCreateInput,
	'id' | 'workspaceId'
> & { roles?: string[] }
const contactImplicationForm = {
	contactId: z.string(),
	caseId: z.string(),
	description: z.string().optional().nullable(),
	roles: z.array(z.string()).optional(),
} satisfies ZodObj<ContactImplicationForm>
export const contactImplicationShema = z.object(contactImplicationForm)

type ContactRoleForm = Omit<Prisma.ContactRoleUncheckedCreateInput, 'id' | 'workspaceId'>
const contactRoleForm = {
	name: z.string(),
	description: z.string().optional().nullable(),
} satisfies ZodObj<ContactRoleForm>
export const contactRoleShema = z.object(contactRoleForm)
