<script lang="ts">
	import { mdiFolderOpenOutline, mdiFolderOutline } from '@mdi/js'
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	import { ws } from '$lib/store'
	import { Badge, ContactLabel } from '$lib/interface'
	import CaseActions from './CaseActions.svelte'

	export let data
</script>

<div class="flex h-full gap-4">
	<ul class="shrink-0 border-r bg-white shadow-2xl">
		{#each data.cases as item}
			{@const active = $page.params.caseId === item.id}
			<li>
				<a href="{$ws}/case/{item.id}" class="menu-item" class:active>
					<Icon
						path={active ? mdiFolderOpenOutline : mdiFolderOutline}
						class="fill-primary-light stroke-none "
					/>

					<Badge><b>{item.ref}</b></Badge>

					<Badge><ContactLabel contact={item.client} /></Badge>

					<span class="grow whitespace-nowrap" class:font-medium={active}>
						{item.name}
					</span>

					<CaseActions _case={item} class="invisible ml-4 group-hover:visible peer-focus:visible" />
				</a>
			</li>
		{/each}
	</ul>

	<slot />
</div>
