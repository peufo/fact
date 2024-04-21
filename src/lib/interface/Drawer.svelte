<script lang="ts">
	import { fly } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	import { urlParam } from '$lib/store'
	import IconButton from '$lib/material/IconButton.svelte'

	export let title = ''
	/** Key used in url query params */
	export let key = 'drawer'
	/** Value need to match in url query params*/
	export let value = 'true'

	$: active = $page.url.searchParams.get(key) === value

	let klass = ''
	export { klass as class }

	export function open() {
		goto($urlParam.with({ key: value }), { replaceState: true })
	}

	export function close() {
		goto($urlParam.without(key), { replaceState: true })
	}
</script>

{#if active}
	<div
		on:click={close}
		on:keyup={close}
		class="fixed inset-0 bg-primary-dark/40 backdrop-blur-[2px] z-10"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		class="{klass}
      fixed top-0 right-0 bottom-0 z-10 w-fit min-w-[300px]
      flex flex-col 
      bg-primary/90 text-primary-lighter fill-primary-lighter stroke-primary-lighter
    "
	>
		<div class="flex items-center justify-between gap-32 p-4 border-b border-primary-dark">
			<h2 class="uppercase text-xl font-medium opacity-70 tracking-wider">{title}</h2>
			<IconButton dark path={mdiClose} on:click={close} title="annuler" />
		</div>

		<div class="grow overflow-auto">
			<slot />
		</div>
	</aside>
{/if}
