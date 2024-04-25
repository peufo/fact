<script lang="ts">
	import { Form, relationProps } from '$lib/interface'
	import { NOTE_DIRECTION_LABEL, NOTE_TYPE_LABEL } from '$lib/constants'
	import { api } from '$lib/store/api'

	export let action = ''
	export let actionDelete = ''
</script>

<Form
	on:success
	{action}
	{actionDelete}
	classSection="pl-8 pr-4"
	fields={[
		[
			{
				key: 'title',
				text: {
					label: 'Titre',
					input: {
						autocomplete: 'off',
						autofocus: true
					}
				}
			},
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
				key: 'decription',
				colSpan: 4,
				textarea: {
					label: 'Description'
				}
			}
		]
	]}
	sections={[{ activable: false }]}
/>
