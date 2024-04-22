<script lang="ts">
	import {
		mdiEmailOutline,
		mdiMapMarkerOutline,
		mdiPhoneOutline,
		mdiSquareEditOutline,
		mdiWeb,
	} from '@mdi/js'
	import type { Contact } from '@prisma/client'
	import IconButton from '$lib/material/IconButton.svelte'
	import { workspacePath } from '$lib/store'
	import { useNotify } from '$lib/notify'

	let klass = ''
	export { klass as class }
	export let contact: Contact

	const notify = useNotify()
</script>

<div class="{klass} flex items-center gap-1 fill-primary-light stroke-none">
	{#if contact.email}
		<IconButton path={mdiEmailOutline} href="mailto:{contact.email}" title="Envoyer un email" />
	{/if}
	{#if contact.phone}
		<IconButton path={mdiPhoneOutline} href="tel:{contact.phone}" title="Téléphoner" />
	{/if}
	{#if contact.web}
		<IconButton
			path={mdiWeb}
			href="https://{contact.web.replace('https://', '')}"
			target="_blank"
			title="Acceder au site web"
		/>
	{/if}
	<IconButton
		path={mdiMapMarkerOutline}
		title="Copier l'adresse"
		on:click={() => notify.simple('TODO')}
	/>
	<IconButton
		path={mdiSquareEditOutline}
		title="Editer le contact"
		href="{$workspacePath}/contact/{contact.id}?contact-form=update"
		class="focus:opacity-100"
	/>
</div>
