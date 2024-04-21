<script lang="ts">
	import { mdiPlus, mdiChevronRight } from '@mdi/js'

	import Button from '$lib/material/Button.svelte'
	import Icon from '$lib/material/Icon.svelte'

	export let titles: string[] = []
	export let createLabel = ''
	export let createHref = ''
	let klass = ''
	export { klass as class }
</script>

<div
	class="{klass} sticky top-0 flex gap-1 p-2 items-center bg-primary-lighter/30 backdrop-blur-sm"
>
	{#each titles as title, index}
		<h2
			class="text-xl px-3 h-10 font-medium grid place-content-center uppercase opacity-75 tracking-wider"
		>
			{title}
		</h2>
		{#if index < titles.length - 1}
			<Icon path={mdiChevronRight} />
		{/if}
	{/each}

	<slot />

	{#if createHref}
		<Button class="ml-auto" href={createHref}>
			<Icon path={mdiPlus} />
			{createLabel || 'Nouveau'}
		</Button>
	{/if}
</div>
