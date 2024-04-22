<script lang="ts">
	import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
	import { page } from '$app/stores'

	import ActionBar from '$lib/layout/ActionBar.svelte'
	import { workspacePath } from '$lib/store'
	import List from '$lib/material/List.svelte'
	import Icon from '$lib/material/Icon.svelte'
	import CaseActions from './Actions.svelte'
	import Badge from '$lib/material/Badge.svelte'
	import ListItem from '$lib/material/ListItem.svelte'
	import { getContactLabel } from '$lib/contact'

	export let data
</script>

<ActionBar
	createLabel="Nouvelle affaire"
	createHref="{$page.url.pathname}?case-form=create"
	titles={['Affaires']}
/>

<div class="flex gap-4 h-full texture">
	<List items={data.cases} let:item class="shrink-0 border-r shadow-2xl bg-white">
		{@const isActive = $page.params.caseId === item.id}
		<ListItem {isActive} href="{$workspacePath}/case/{item.id}">
			<Icon
				path={isActive ? mdiFolderOpenOutline : mdiFolderOutline}
				class="fill-primary-light stroke-none "
			/>

			<Badge><b>{item.ref}</b></Badge>

			<Badge>{getContactLabel(item.client)}</Badge>

			<span class="whitespace-nowrap grow " class:font-medium={isActive}>
				{item.name}
			</span>

			<CaseActions _case={item} class="ml-4 invisible peer-focus:visible group-hover:visible" />
		</ListItem>
	</List>

	<slot />
</div>
