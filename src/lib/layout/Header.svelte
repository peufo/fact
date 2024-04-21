<script lang="ts">
	import { mdiFileDocumentMultipleOutline } from '@mdi/js'
	import { Icon, ToggleMode } from 'fuma'
	import MenuUser from './MenuUser.svelte'

	export let user: App.Locals['user']
</script>

<div class="flex items-center gap-2 border-b p-2">
	<a href="/" class="btn btn-ghost btn-sm">
		<Icon path={mdiFileDocumentMultipleOutline} />
		Fact
	</a>

	<div class="grow" />
	<ToggleMode />

	<MenuUser {user} />
</div>
