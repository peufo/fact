<script lang="ts">
	import { ws } from '$lib/store'
	import { Form } from 'fuma'

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
			{ key: 'name', colSpan: 4, text: { label: 'Nom du rôle' } },
			{ key: 'description', colSpan: 4, textarea: { label: 'Description' } }
		]
	]}
/>
