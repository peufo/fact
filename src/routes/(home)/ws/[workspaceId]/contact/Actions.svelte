<script lang="ts">
	import {
		mdiEmailOutline,
		mdiMapMarkerOutline,
		mdiPhoneOutline,
		mdiSquareEditOutline,
		mdiWeb
	} from '@mdi/js'
	import { toast } from 'svelte-sonner'
	import { Icon } from 'fuma'
	import type { Contact } from '@prisma/client'
	import { ws } from '$lib/store'

	let klass = ''
	export { klass as class }
	export let contact: Contact
</script>

<div class="{klass} fill-primary-light flex items-center gap-1 stroke-none">
	{#if contact.email}
		<a class="btn btn-square btn-sm" href="mailto:{contact.email}">
			<Icon path={mdiEmailOutline} title="Envoyer un email" />
		</a>
	{/if}
	{#if contact.phone}
		<a class="btn btn-square btn-sm" href="tel:{contact.phone}">
			<Icon path={mdiPhoneOutline} title="Téléphoner" />
		</a>
	{/if}
	{#if contact.web}
		<a
			class="btn btn-square btn-sm"
			target="_blank"
			href="https://{contact.web.replace('https://', '')}"
		>
			<Icon path={mdiWeb} title="Acceder au site web" />
		</a>
	{/if}
	<Icon path={mdiMapMarkerOutline} title="Copier l'adresse" on:click={() => toast.info('TODO')} />
	<a class="btn btn-square btn-sm" href="{$ws}/contact/{contact.id}?contact-form=update">
		<Icon path={mdiSquareEditOutline} title="Editer le contact" class="focus:opacity-100" />
	</a>
</div>
