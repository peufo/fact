<script lang="ts">
	import {
		mdiBadgeAccountHorizontalOutline,
		mdiBankOutline,
		mdiClipboardTextClockOutline,
		mdiClipboardTextOutline
	} from '@mdi/js'

	import { Icon, Card } from 'fuma'
	import type { LayoutData } from './$types'
	import ContactActions from '../Actions.svelte'
	import Cases from './Cases.svelte'
	import { ContactLabel } from '$lib/interface'

	export let contact: LayoutData['contact']
</script>

<div class="flex flex-col gap-2 rounded-md border bg-white px-4 py-2 text-primary shadow-xl">
	<div class="flex items-center gap-2">
		<Icon
			path={contact.isMoralPerson ? mdiBankOutline : mdiBadgeAccountHorizontalOutline}
			class="fill-primary-light stroke-none"
		/>
		<h3 class="text-xl"><ContactLabel {contact} /></h3>
		<div class="grow" />

		<ContactActions {contact} />
	</div>

	{#if contact.note}
		<p class="text-primary-light mb-3">{contact.note}</p>
	{/if}

	<div class="fill-primary-light mt-3 grid grid-cols-2 gap-4 stroke-none">
		<Cases {contact} />

		<Card>
			<h4 slot="title" class="flex gap-2 py-2 text-lg">
				<Icon path={mdiClipboardTextOutline} title="Document" />
				Documents
			</h4>
			<p>Documents en liens avec le contact</p>
		</Card>

		<Card class="col-span-2">
			<h4 slot="title" class="flex gap-2 py-2 text-lg">
				<Icon path={mdiClipboardTextClockOutline} title="Timeline" />
				Chronologie du contact
			</h4>
			<ul>
				<li>Event A</li>
				<li>Event B</li>
				<li>Event C</li>
				<li>Event D</li>
			</ul>
		</Card>
	</div>
</div>
