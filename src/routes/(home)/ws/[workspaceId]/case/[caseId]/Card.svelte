<script lang="ts">
	import { mdiClipboardTextClockOutline, mdiLightningBoltOutline } from '@mdi/js'

	import type { LayoutData } from './$types'
	import Icon from '$lib/material/Icon.svelte'
	import Section from '$lib/material/Section.svelte'
	import { caseStateMap } from '$lib/shema'
	import CaseActions from '../Actions.svelte'
	import Badge from '$lib/material/Badge.svelte'
	import Contacts from './Contacts.svelte'

	export let _case: LayoutData['case']
</script>

<div class="flex flex-col gap-2 border rounded-md px-4 py-2 shadow-xl bg-white">
	<div class="flex items-center gap-2">
		<Badge><b>{_case.ref}</b></Badge>
		<Badge>{caseStateMap[_case.state]}</Badge>
		<h3 class="text-xl">{_case.name}</h3>
		<div class="grow" />

		<CaseActions {_case} />
	</div>

	{#if _case.description}
		<p class="text-primary-light ">{_case.description}</p>
	{/if}

	<div class="grid gap-4 grid-cols-2 fill-primary-light stroke-none mt-3">
		<Contacts {_case} />

		<Section>
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiLightningBoltOutline} title="Préstation" class="rotate-12" />
				Préstations
			</h4>
			<ul>
				<li>TODO</li>
				<li>Préstation A</li>
				<li>Préstation B</li>
			</ul>
		</Section>

		<!--
		<Section>
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiFileDocumentMultipleOutline} title="Documents" />
				<span class="font-medium">3</span>
				<span class="grow mr-4">Documents</span>
			</h4>
			<ul>
				<li>TODO</li>
				<li>Liste des documents joints aux notes</li>
			</ul>
		</Section>			
		-->

		<Section class="col-span-2">
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiClipboardTextClockOutline} title="Timeline" />
				Chronologie de l'affaire
			</h4>
			<ul>
				<li>TODO</li>
				<li>notes A</li>
				<li>notes B</li>
				<li>notes C</li>
				<li>notes D</li>
			</ul>
		</Section>
	</div>
</div>
