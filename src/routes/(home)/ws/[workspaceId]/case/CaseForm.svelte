<script lang="ts">
	import { urlParam, Form, relationProps } from 'fuma'

	import type { Case, Contact, User, WorkspaceMember } from '@prisma/client'
	import { CASE_STATE_LABEL } from '$lib/constants'

	import { api } from '$lib/store/api'
	import { ws } from '$lib/store'
	type CaseWithInclude = Case & {
		client: Contact
		memberInCharge: WorkspaceMember & { user: User }
		memberAdmin: (WorkspaceMember & { user: User }) | null
	}

	export let action = ''
	export let actionDelete = ''

	export let data: Partial<CaseWithInclude> | undefined = undefined
	export let form: Form<any> | undefined = undefined
</script>

<Form
	{data}
	on:success
	bind:this={form}
	{action}
	{actionDelete}
	actionPrefix={$ws}
	fields={[
		[
			{
				key: 'ref',
				colSpan: 1,
				number: {
					label: "N° d'affaire",
					input: {
						min: 0,
						size: 1,
						style: 'width: minmax(2rem, 100%);'
					}
				}
			},
			{
				key: 'name',
				colSpan: 3,
				text: {
					label: `Nom de l'affaire`,
					input: {
						autocomplete: 'off',
						autofocus: true
					}
				}
			},
			{
				key: 'client',
				relation: relationProps({
					label: 'Client',
					value: data?.client,
					search: $api.contact.search,
					createUrl: $urlParam.with({ 'contact-form': 'create' }),
					createTitle: 'Nouveau client',
					slotItem: (contact) => `${contact.firstName} ${contact.name}`
				})
			},
			{
				key: 'state',
				select: {
					label: 'Status',
					value: 'open',
					options: CASE_STATE_LABEL
				}
			},
			{
				key: 'memberInCharge',
				relation: relationProps({
					label: 'Responsable',
					value: data?.memberInCharge,
					search: $api.member.search,
					slotItem: (member) => member.user.username
				})
			},
			{
				key: 'memberAdmin',
				relation: relationProps({
					label: 'Administrateur',
					value: data?.memberAdmin,
					search: $api.member.search,
					slotItem: (member) => member.user.username
				})
			}
		],
		[
			{
				key: 'openAt',
				date: {
					label: "Date d'ouverture",
					value: new Date()
				}
			},
			{
				key: 'closeAt',
				date: {
					label: 'Date de clôture'
				}
			},
			{
				key: 'description',
				colSpan: 4,
				textarea: {
					label: 'Remarque'
				}
			},
			{ key: 'language', text: { label: 'Langue' } }
		]
	]}
	sections={[{}, { title: 'Compléments', isReducible: true }]}
/>
