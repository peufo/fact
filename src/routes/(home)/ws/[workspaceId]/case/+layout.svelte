<script lang="ts">
	import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	import { ws } from '$lib/store'
	import { ActionBar, List, ListItem, Badge, ContactLabel } from '$lib/interface'
	import CaseActions from './CaseActions.svelte'

	export let data
</script>

<ActionBar
	createLabel="Nouvelle affaire"
	createHref="{$page.url.pathname}?case-form=create"
	titles={['Affaires']}
/>

<div class="texture flex h-full gap-4">
	<List items={data.cases} let:item class="shrink-0 border-r bg-white shadow-2xl">
		{@const isActive = $page.params.caseId === item.id}
		<ListItem {isActive} href="{$ws}/case/{item.id}">
			<Icon
				path={isActive ? mdiFolderOpenOutline : mdiFolderOutline}
				class="fill-primary-light stroke-none "
			/>

			<Badge><b>{item.ref}</b></Badge>

			<Badge><ContactLabel contact={item.client} /></Badge>

			<span class="grow whitespace-nowrap" class:font-medium={isActive}>
				{item.name}
			</span>

			<CaseActions _case={item} class="invisible ml-4 group-hover:visible peer-focus:visible" />
		</ListItem>
	</List>

	<slot />
</div>
