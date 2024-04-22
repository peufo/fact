<script lang="ts">
	import { mdiFolderMultipleOutline, mdiPlus } from '@mdi/js'
	import type { LayoutData } from './$types'

	import { urlParam, workspacePath } from '$lib/store'
	import Icon from '$lib/material/Icon.svelte'
	import IconButton from '$lib/material/IconButton.svelte'
	import Section from '$lib/material/Section.svelte'
	import ListItem from '$lib/material/ListItem.svelte'
	import Badge from '$lib/material/Badge.svelte'

	export let contact: LayoutData['contact']
</script>

<Section contentClass="p-[8px]">
	<div slot="title" class="text-lg flex grow gap-2 py-2 pr-1">
		<Icon path={mdiFolderMultipleOutline} title="Affaires" />
		<div class="grow">Affaires</div>
		<div class="my-auto ml-full">
			<IconButton
				path={mdiPlus}
				size={16}
				href={$urlParam.with({ 'implication-form': 'create' })}
				title="Nouvelle implication"
				class="scale-125"
			/>
		</div>
	</div>
	<ul>
		{#each contact.cases as _case (_case.id)}
			<ListItem href="{$workspacePath}/case/{_case.id}" class="pl-[8px]">
				<Badge>{_case.ref}</Badge>
				<span class="grow">{_case.name}</span>
				<Badge>Client</Badge>
			</ListItem>
		{/each}

		{#each contact.implications as imp (imp.id)}
			<ListItem
				href="{$workspacePath}/case/{imp.case.id}"
				class="pl-[8px]"
				title={imp.description}
				tippyProps={{ placement: 'left' }}
			>
				<Badge>{imp.case.ref}</Badge>
				<span class="grow">{imp.case.name}</span>
				{#each imp.roles as { name }}
					<Badge>{name}</Badge>
				{/each}
			</ListItem>
		{/each}

		{#if !contact.cases.length && !contact.implications.length}
			<li class="text-center opacity-60 py-4">Aucune affaire</li>
		{/if}
	</ul>
</Section>
