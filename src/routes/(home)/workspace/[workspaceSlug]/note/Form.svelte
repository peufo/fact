<script lang="ts">
	import { page } from '$app/stores'
	import Form from '$lib/material/Form.svelte'
	import { noteDirectionLabel, noteShema, noteTypeLabel } from '$lib/shema'
	import { api } from '$lib/store/api'

	export let action = ''
	export let actionDelete = ''
</script>

<Form
	on:success
	on:delete
	dark
	{action}
	{actionDelete}
	shema={noteShema}
	fields={[
		[
			{
				key: 'title',
				label: 'Titre',
				input: { type: 'text', autocomplete: 'off', autofocus: true },
			},
			{
				key: 'caseId',
				label: 'Affaire',
				value: $page.params.caseId,
				input: {
					type: 'relation',
					search: $api.case.search,
					getItem: $api.case.findOne,
					getLabel: (item) => item.name,
				},
			},
			{ key: 'type', label: 'Type', input: { type: 'select', items: noteTypeLabel } },
			{
				key: 'direction',
				label: 'Sortant / Entrant',
				input: { type: 'select', items: noteDirectionLabel },
				hide: ({ type }) => !type || !['phone', 'email', 'mail'].includes(type),
			},
			{ key: 'decription', label: 'Description', colSpan: 4, input: { type: 'textarea' } },
		],
	]}
	sections={[{ activable: false }]}
/>
