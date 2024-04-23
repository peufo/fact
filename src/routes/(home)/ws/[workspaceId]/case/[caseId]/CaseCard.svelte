<script lang="ts">
	import { mdiClipboardTextClockOutline, mdiLightningBoltOutline } from '@mdi/js'
	import { Icon, Card } from 'fuma'

	import type { LayoutData } from './$types'
	import { CASE_STATE_LABEL } from '$lib/constants'
	import { Badge } from '$lib/interface'
	import CaseActions from '../CaseActions.svelte'
	import Contacts from './Contacts.svelte'

	export let _case: LayoutData['case']
</script>

<div class="flex flex-col gap-2 rounded-md border bg-white px-4 py-2 shadow-xl">
	<div class="flex items-center gap-2">
		<Badge><b>{_case.ref}</b></Badge>
		<Badge>{CASE_STATE_LABEL[_case.state]}</Badge>
		<h3 class="text-xl">{_case.name}</h3>
		<div class="grow" />

		<CaseActions {_case} />
	</div>

	{#if _case.description}
		<p class="text-primary-light">{_case.description}</p>
	{/if}

	<div class="fill-primary-light mt-3 grid grid-cols-2 gap-4 stroke-none">
		<Contacts {_case} />

		<Card>
			<h4 slot="title" class="flex gap-2 py-2 text-lg">
				<Icon path={mdiLightningBoltOutline} title="Préstation" class="rotate-12" />
				Préstations
			</h4>
			<ul>
				<li>TODO</li>
				<li>Préstation A</li>
				<li>Préstation B</li>
			</ul>
		</Card>

		<!--
		<Card>
			<h4 slot="title" class="text-lg flex gap-2 py-2">
				<Icon path={mdiFileDocumentMultipleOutline} title="Documents" />
				<span class="font-medium">3</span>
				<span class="grow mr-4">Documents</span>
			</h4>
			<ul>
				<li>TODO</li>
				<li>Liste des documents joints aux notes</li>
			</ul>
		</Card>			
		-->

		<Card class="col-span-2">
			<h4 slot="title" class="flex gap-2 py-2 text-lg">
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
		</Card>
	</div>
</div>
