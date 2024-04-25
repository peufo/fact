<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { Icon, urlParam } from 'fuma'

	import { drawerLayers } from './store'

	export let title = ''
	/** Key used in url query params */
	export let key: string
	/** Value need to match in url query params*/
	export let value = '1'

	let isActive = false
	let layerIndex = -1

	page.subscribe(async ({ url }) => {
		const _isActive = url.searchParams.get(key) === value
		if (isActive === _isActive) return
		isActive = _isActive
		if (isActive) {
			$drawerLayers = [...$drawerLayers, key]
		} else {
			$drawerLayers = [
				...$drawerLayers.slice(0, layerIndex),
				...$drawerLayers.slice(layerIndex + 1)
			]
		}
		layerIndex = $drawerLayers.indexOf(key)
	})

	let klass = ''
	export { klass as class }

	export function open() {
		goto($urlParam.with({ key: value }), { replaceState: true })
	}

	export function close() {
		goto($urlParam.without(key), { replaceState: true })
	}
</script>

<svelte:head>
	{#if isActive}
		<style>
			:root {
				scrollbar-width: none;
			}
		</style>
	{/if}
</svelte:head>

{#if isActive}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={close}
		on:keyup={close}
		transition:fade={{ duration: 200 }}
		class="
			fixed inset-0 z-10 bg-black/25 backdrop-blur-[1.5px]
			 dark:bg-white/25"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		style="max-width: min(100%, 40rem); transform: translateX({-(
			$drawerLayers.length -
			layerIndex -
			1
		) * 4}rem);"
		class="{klass}
      fixed bottom-0 right-0 top-0 z-10 flex min-w-[300px]
			flex-col overflow-y-scroll bg-base-100 transition-transform
    "
	>
		<div
			class="
				sticky top-0 z-10 flex items-center justify-between
				gap-32 border-b bg-base-100 p-4 pl-8
			"
		>
			<h2 class="title">{title} {layerIndex}</h2>
			<button on:click={close} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="grow">
			<slot />
		</div>
	</aside>
{/if}
