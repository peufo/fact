<script lang="ts">
	import Form from '$lib/material/Form.svelte'
	import { contactRoleShema } from '$lib/shema'

	export let action = ''
	export let actionDelete = ''
</script>

<Form
	on:success
	on:delete
	{action}
	{actionDelete}
	dark
	shema={contactRoleShema}
	fields={[
		[
			{ key: 'name', label: 'Nom du rôle', colSpan: 4 },
			{ key: 'description', label: 'Description', colSpan: 4, input: { type: 'textarea' } },
		],
	]}
	sections={[{ activable: false }]}
/>
