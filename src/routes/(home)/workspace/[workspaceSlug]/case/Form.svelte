<script lang="ts">
	import { page } from '$app/stores'
	import { api } from '$lib/store/api'
	import { urlParam } from '$lib/store'

	import type { Case } from '@prisma/client'
	import { caseShema, caseStateMap } from '$lib/shema'
	import Form from '$lib/material/Form.svelte'
	import { getContactLabel } from '$lib/contact'

	export let action = ''
	export let actionDelete = ''
	export let nextRef: number = 0
	export let data: Case | undefined = undefined
	// TODO: find how to pass an arguments in Form
	export let form: Form<any> | undefined = undefined
</script>

<Form
	on:success
	on:delete
	{data}
	bind:this={form}
	shema={caseShema}
	{action}
	{actionDelete}
	dark
	class="max-w-lg"
	fields={[
		[
			{
				key: 'ref',
				label: "N° d'affaire",
				colSpan: 1,
				value: nextRef,
				input: {
					type: 'number',
				},
			},
			{
				key: 'name',
				colSpan: 3,
				label: `Nom de l'affaire`,
				input: { type: 'text', autocomplete: 'off', autofocus: true },
			},
			{
				key: 'clientId',
				label: 'Client',
				value: $page.params.contactId,
				input: {
					type: 'relation',
					search: $api.contact.search,
					getItem: $api.contact.findOne,
					getLabel: getContactLabel,
					createUrl: $urlParam.with({ 'contact-form': 'create' }),
					createTitle: 'Nouveau client',
				},
			},
			{
				key: 'state',
				label: 'Status',
				value: 'open',
				input: {
					type: 'select',
					items: caseStateMap,
				},
			},
			{
				key: 'memberInChargeId',
				label: 'Responsable',
				value: $page.data.member?.id,
				input: {
					type: 'relation',
					search: $api.member.search,
					getItem: $api.member.findOne,
					getLabel: (item) => item.user.name,
				},
			},
			{
				key: 'memberAdminId',
				label: 'Administrateur',
				input: {
					type: 'relation',
					search: $api.member.search,
					getItem: $api.member.findOne,
					getLabel: (item) => item.user.name,
				},
			},
		],
		[
			{ key: 'openAt', label: "Date d'ouverture", value: new Date(), input: { type: 'date' } },
			{ key: 'closeAt', label: 'Date de clôture', input: { type: 'date' } },
			{ key: 'description', label: 'Remarque', colSpan: 4, input: { type: 'textarea' } },
			{ key: 'language', label: 'Langue' },
		],
	]}
	sections={[{ activable: false }, { title: 'Compléments' }]}
/>
