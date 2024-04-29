<script lang="ts">
	import { mdiFolderMultipleOutline, mdiPlus } from '@mdi/js'
	import type { LayoutData } from './$types'

	import { Card, urlParam, Icon } from 'fuma'
	import { ws } from '$lib/store'
	import { Badge } from '$lib/interface'

	export let contact: LayoutData['contact']
</script>

<Card>
	<div slot="title" class="flex grow gap-2 py-2 pr-1 text-lg">
		<Icon path={mdiFolderMultipleOutline} title="Affaires" />
		<div class="grow">Affaires</div>
		<div class="ml-full my-auto">
			<a href={$urlParam.with({ 'implication-form': 'create' })}>
				<Icon path={mdiPlus} size={16} title="Nouvelle implication" class="scale-125" />
			</a>
		</div>
	</div>
	<ul>
		{#each contact.cases as _case (_case.id)}
			<li class="pl-[8px]">
				<a href="{$ws}/case/{_case.id}">
					<Badge>{_case.ref}</Badge>
					<span class="grow">{_case.name}</span>
					<Badge>Client</Badge>
				</a>
			</li>
		{/each}

		{#each contact.implications as imp (imp.id)}
			<li>
				<a href="{$ws}/case/{imp.case.id}">
					<Badge>{imp.case.ref}</Badge>
					<span class="grow">{imp.case.name}</span>
					{#each imp.roles as { name }}
						<Badge>{name}</Badge>
					{/each}
				</a>
			</li>
		{/each}

		{#if !contact.cases.length && !contact.implications.length}
			<li class="py-4 text-center opacity-60">Aucune affaire</li>
		{/if}
	</ul>
</Card>
