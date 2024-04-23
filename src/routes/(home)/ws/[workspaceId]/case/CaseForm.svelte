<script lang="ts">
	import { component, urlParam } from 'fuma'
	import { ContactLabel, Form, relationProps, type OnSuccess } from '$lib/interface'

	import type { Case, Contact, User, WorkspaceMember } from '@prisma/client'
	import { CASE_STATE_LABEL } from '$lib/constants'

	import { api } from '$lib/store/api'

	type CaseWithInclude = Case & {
		client: Contact
		memberInCharge: WorkspaceMember & { user: User }
		memberAdmin: (WorkspaceMember & { user: User }) | null
	}

	export let action = ''
	export let actionDelete = ''
	export let nextRef: number = 0

	export let data: CaseWithInclude | undefined = undefined
	// TODO: find how to pass an arguments in Form
	export let form: Form<any> | undefined = undefined
</script>

<Form
	{data}
	on:success
	bind:this={form}
	{action}
	{actionDelete}
	class="max-w-lg"
	fields={[
		[
			{
				key: 'ref',
				colSpan: 1,
				number: {
					label: "N° d'affaire",
					value: String(nextRef)
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
					item: data?.client,
					search: $api.contact.search,
					createUrl: $urlParam.with({ 'contact-form': 'create' }),
					createTitle: 'Nouveau client',
					slotItem: (contact) => component(ContactLabel, { contact }),
					slotSuggestion: (contact) => component(ContactLabel, { contact })
				})
			},
			{
				key: 'state',
				select: {
					value: 'open',
					options: CASE_STATE_LABEL
				}
			},
			{
				key: 'memberInCharge',
				relation: relationProps({
					label: 'Responsable',
					item: data?.memberInCharge,
					search: $api.member.search,
					slotItem: (member) => member.user.username
				})
			},
			{
				key: 'memberAdmin',
				relation: relationProps({
					label: 'Administrateur',
					item: data?.memberAdmin,
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
	sections={[{ activable: false }, { title: 'Compléments' }]}
/>
