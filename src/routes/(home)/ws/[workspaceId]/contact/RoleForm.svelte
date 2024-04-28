<script lang="ts">
	import { Form } from 'fuma'

	export let action = ''
	export let actionDelete = ''
</script>

<Form
	on:success
	{action}
	{actionDelete}
	fields={[
		[
			{ key: 'name', colSpan: 4, text: { label: 'Nom du rôle' } },
			{ key: 'description', colSpan: 4, textarea: { label: 'Description' } }
		]
	]}
/>
