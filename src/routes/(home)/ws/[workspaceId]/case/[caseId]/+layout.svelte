<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import { invalidate, goto } from '$app/navigation'
	import { Drawer } from '$lib/interface'
	import { ws } from '$lib/store'
	import CaseForm from '../CaseForm.svelte'

	export let data
	// TODO: Drawer with update+delete case

	let drawer: Drawer

	async function handleSuccess() {
		await invalidate('case')
		drawer.close()
	}
	async function handleDelete() {
		await goto(`${$ws}/case`)
		await invalidate('case')
	}
</script>

{#key $page.params.contactId}
	<div in:fade|local class="mx-auto max-w-4xl grow p-4">
		<slot />
	</div>
{/key}

<Drawer bind:this={drawer} title="Modifer affaire" key="case-form" value="update">
	<CaseForm
		action="/case/{data.case.id}?/update"
		actionDelete="/case/{data.case.id}?/delete"
		data={data.case}
		on:success={handleSuccess}
		on:delete={handleDelete}
	/>
</Drawer>
