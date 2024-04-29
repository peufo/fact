<script lang="ts">
	import { Form, relationProps } from 'fuma'
	import { NOTE_DIRECTION_LABEL, NOTE_TYPE_LABEL } from '$lib/constants'
	import { api } from '$lib/store/api'
	import { ws } from '$lib/store'

	export let action = ''
	export let actionDelete = ''
</script>

<Form
	on:success
	{action}
	{actionDelete}
	actionPrefix={$ws}
	fields={[
		[
			{
				key: 'case',
				relation: relationProps({
					label: 'Affaire',
					// TODO: load item from params.caseId
					search: $api.case.search,
					slotItem: (item) => item.name
				})
			},
			{
				key: 'type',
				select: {
					label: 'Type de note',
					options: NOTE_TYPE_LABEL
				}
			},
			{
				key: 'direction',
				select: {
					label: 'Entrant / Sortant',
					options: NOTE_DIRECTION_LABEL
				},
				hide: ({ type }) => !type || !['phone', 'email', 'mail'].includes(type)
			},
			{
				key: 'name',
				colSpan: 4,
				hide: (item) => !item.id,
				text: {
					label: 'Nom de la note',
					input: {
						autocomplete: 'off',
						autofocus: true
					}
				}
			},
			{
				key: 'content',
				colSpan: 4,
				textrich: {
					label: 'Contenu'
				}
			}
		]
	]}
/>
