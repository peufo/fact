<script lang="ts">
	import { component, urlParam, Form, relationProps, relationsProps } from 'fuma'
	import type { ContactImplication } from '@prisma/client'

	import { ContactLabel } from '$lib/interface'
	import { api } from '$lib/store/api'

	export let action = ''
	export let actionDelete = ''
	// TODO: find how to pass an arguments in Form
	export let form: Form<any> | undefined = undefined
	export let implication: ContactImplication | undefined = undefined
</script>

<Form
	on:success
	on:delete
	{action}
	{actionDelete}
	bind:this={form}
	data={implication}
	fields={[
		[
			{
				key: 'contact',
				relation: relationProps({
					// TODO: load item from urlSearchParams 'contactId'
					label: 'Contact',
					search: $api.contact.search,
					slotItem: (contact) => component(ContactLabel, { contact }),
					createUrl: $urlParam.with({ 'contact-form': 'create' }),
					createTitle: 'Nouveau contact'
				})
			},
			{
				key: 'case',
				relation: relationProps({
					label: 'Affaire',
					// TODO: load item from urlSearchParams 'caseId'
					search: $api.case.search,
					slotItem: (item) => item.name
				})
			},
			{
				key: 'roles',
				colSpan: 4,
				relations: relationsProps({
					label: 'Rôles',
					search: $api.role.search,
					slotItem: (item) => item.name,
					createUrl: $urlParam.with({ 'role-form': 'create' })
				})
			},
			{
				key: 'description',
				colSpan: 4,
				textarea: {
					label: 'Description'
				}
			}
		]
	]}
/>
