<script lang="ts">
	import { mdiFileDocumentMultipleOutline } from '@mdi/js'
	import { Icon, InputSearch } from 'fuma'
	import MenuUser from './MenuUser.svelte'
	import MenuWorkspace from './MenuWorkspace.svelte'
	import { page } from '$app/stores'
	import MenuCreate from './MenuCreate.svelte'
</script>

<div class="sticky top-0 z-10 flex items-center gap-2 bg-base-100/50 p-2 backdrop-blur-sm">
	{#if $page.data.user && $page.data.workspaces}
		<MenuWorkspace workspaces={$page.data.workspaces} />
	{:else}
		<a href="/" class="btn btn-ghost btn-sm">
			<Icon path={mdiFileDocumentMultipleOutline} />
			Fact
		</a>
	{/if}
	{#if $page.data.workspace}
		<InputSearch />
	{/if}

	<div class="grow" />
	{#if $page.data.workspace}
		<MenuCreate />
	{/if}

	<MenuUser user={$page.data.user} />
</div>
