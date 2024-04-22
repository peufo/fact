<script lang="ts">
	import {
		mdiBadgeAccountHorizontalOutline,
		mdiBankOutline,
		mdiClipboardTextClockOutline,
		mdiClipboardTextOutline,
	} from '@mdi/js'

	import type { LayoutData } from './$types'
	import Icon from '$lib/material/Icon.svelte'
	import Section from '$lib/material/Section.svelte'
	import ContactActions from '../Actions.svelte'
	import { getContactLabel } from '$lib/contact'
	import Cases from './Cases.svelte'

	export let contact: LayoutData['contact']
</script>

<div class="flex flex-col gap-2 border rounded-md px-4 py-2 shadow-xl bg-white text-primary">
	<div class="flex items-center gap-2">
		<Icon
			path={contact.isMoralPerson ? mdiBankOutline : mdiBadgeAccountHorizontalOutline}
			class="fill-primary-light stroke-none"
		/>
		<h3 class="text-xl">{getContactLabel(contact)}</h3>
		<div class="grow" />

		<ContactActions {contact} />
	</div>

	{#if contact.note}
		<p class="text-primary-light mb-3">{contact.note}</p>
	{/if}

	<div class="grid gap-4 grid-cols-2 fill-primary-light stroke-none mt-3">
		<Cases {contact} />

		<Section>
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiClipboardTextOutline} title="Document" />
				Documents
			</h4>
			<p>Documents en liens avec le contact</p>
		</Section>

		<Section class="col-span-2">
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiClipboardTextClockOutline} title="Timeline" />
				Chronologie du contact
			</h4>
			<ul>
				<li>Event A</li>
				<li>Event B</li>
				<li>Event C</li>
				<li>Event D</li>
			</ul>
		</Section>
	</div>
</div>
