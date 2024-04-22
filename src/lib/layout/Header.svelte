<script lang="ts">
	import { mdiFileDocumentMultipleOutline } from '@mdi/js'
	import { Icon, ToggleMode } from 'fuma'
	import MenuUser from './MenuUser.svelte'
	import MenuWorkspace from './MenuWorkspace.svelte'
	import type { Workspace } from '@prisma/client'

	export let user: App.Locals['user'] = null
	export let workspaces: Workspace[] = []
</script>

<div class="flex items-center gap-2 border-b p-2">
	<a href="/" class="btn btn-ghost btn-sm">
		<Icon path={mdiFileDocumentMultipleOutline} />
		Fact
	</a>
	{#if user}
		<MenuWorkspace {workspaces} />
	{/if}

	<div class="grow" />
	<ToggleMode />

	<MenuUser {user} />
</div>
