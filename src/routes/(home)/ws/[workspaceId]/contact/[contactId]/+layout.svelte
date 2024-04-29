<script lang="ts">
	import { fade } from 'svelte/transition'
	import { invalidate, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Drawer } from 'fuma'

	import { ws } from '$lib/store'
	import ContactForm from '../ContactForm.svelte'

	export let data
	let drawer: Drawer

	async function handleSuccess() {
		await invalidate('contact')
		drawer.close()
	}

	async function handleDelete() {
		await goto(`${$ws}/contact`)
		await invalidate('contact')
	}
</script>

{#key $page.params.contactId}
	<div in:fade|local class="mx-auto max-w-3xl grow">
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
