<script lang="ts">
	import { page } from '$app/stores'

	import { getContactLabel } from '$lib/contact'
	import Form from '$lib/material/Form.svelte'
	import { contactImplicationShema } from '$lib/shema'
	import { urlParam } from '$lib/store'
	import { api } from '$lib/store/api'
	import type { ContactImplication } from '@prisma/client'

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
	dark
	data={implication}
	shema={contactImplicationShema}
	fields={[
		[
			{
				key: 'contactId',
				label: 'Contact',
				value: $page.params.contactId,
				input: {
					type: 'relation',
					search: $api.contact.search,
					getItem: $api.contact.findOne,
					getLabel: getContactLabel,
					createUrl: $urlParam.with({ 'contact-form': 'create' }),
					createTitle: 'Nouveau contact',
				},
			},
			{
				key: 'caseId',
				label: 'Affaire',
				value: $page.params.caseId,
				input: {
					type: 'relation',
					getItem: $api.case.findOne,
					search: $api.case.search,
					getLabel: (item) => item.name,
				},
			},
			{
				key: 'roles',
				label: 'Rôles',
				colSpan: 4,
				input: {
					type: 'relations',
					getItems: $api.role.findMany,
					search: $api.role.search,
					getLabel: (item) => item.name,
					createUrl: $urlParam.with({ 'role-form': 'create' }),
				},
			},
			{ key: 'description', label: 'Description', colSpan: 4, input: { type: 'textarea' } },
		],
	]}
	sections={[{ activable: false }]}
/>
