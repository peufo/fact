<script lang="ts">
	import { mdiPlus, mdiChevronRight } from '@mdi/js'
	import { Icon } from 'fuma'

	export let titles: string[] = []
	export let createLabel = ''
	export let createHref = ''
	let klass = ''
	export { klass as class }
</script>

<div class="{klass} flex items-center gap-1 p-2">
	{#each titles as title, index}
		<h2
			class="grid h-10 place-content-center px-3 text-xl font-medium uppercase tracking-wider opacity-75"
		>
			{title}
		</h2>
		{#if index < titles.length - 1}
			<Icon path={mdiChevronRight} />
		{/if}
	{/each}

	<slot />

	{#if createHref}
		<a class="btn ml-auto" href={createHref}>
			<Icon path={mdiPlus} />
			{createLabel || 'Nouveau'}
		</a>
	{/if}
</div>
