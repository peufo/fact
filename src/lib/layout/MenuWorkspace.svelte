<script lang="ts">
	import type { Workspace } from '@prisma/client'
	import { mdiPlus, mdiUnfoldMoreHorizontal } from '@mdi/js'
	import { DropDown, Icon } from 'fuma'
	import { page } from '$app/stores'

	export let workspaces: Workspace[]
</script>

{#if !workspaces.length}
	<a href="/create" class="btn btn-primary btn-sm"> Créer un espace de travail </a>
{:else}
	<DropDown>
		<button slot="activator" class="menu-item">
			{#if $page.data.workspace}
				{$page.data.workspace.name}
			{:else}
				<span class="text-sm opacity-60">Sélectionner un espace de travail</span>
			{/if}
			<Icon path={mdiUnfoldMoreHorizontal} size={18} />
		</button>

		<div class="flex flex-col gap-1">
			{#each workspaces as workspace}
				<a href="/ws/{workspace.id}" class="menu-item">
					{workspace.name}
				</a>
			{/each}
			<hr />
			<a href="/create" class="menu-item">
				<Icon path={mdiPlus} size={18} />
				<span>Nouveau</span>
			</a>
		</div>
	</DropDown>
{/if}
