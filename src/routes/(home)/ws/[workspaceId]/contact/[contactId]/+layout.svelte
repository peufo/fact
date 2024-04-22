<script lang="ts">
	import { fade } from 'svelte/transition'
	import { invalidate, goto } from '$app/navigation'
	import { page } from '$app/stores'

	import ContactForm from '../Form.svelte'
	import Drawer from '$lib/material/Drawer.svelte'
	import { workspacePath } from '$lib/store'

	export let data
	let drawer: Drawer

	async function handleSuccess() {
		await invalidate('contact')
		drawer.close()
	}

	async function handleDelete() {
		await goto(`${$workspacePath}/contact`)
		await invalidate('contact')
	}
</script>

{#key $page.params.contactId}
	<div in:fade|local class="grow mx-auto max-w-3xl p-4">
		<slot />
	</div>
{/key}

<!-- Modification du contact -->
<Drawer bind:this={drawer} title="Modifier contact" key="contact-form" value="update">
	<ContactForm
		on:success={handleSuccess}
		on:delete={handleDelete}
		action="/contact/{data.contact.id}?/update"
		actionDelete="/contact/{data.contact.id}?/delete"
		contact={data.contact}
	/>
</Drawer>
