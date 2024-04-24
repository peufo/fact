<script lang="ts">
	import { fade, fly } from 'svelte/transition'
	import { mdiClose } from '@mdi/js'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	import { Icon, urlParam } from 'fuma'

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
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={close}
		on:keyup={close}
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-10 bg-black/25 backdrop-blur-[1px] transition-opacity"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		class="{klass}
      fixed bottom-0 right-0 top-0 z-10 flex w-fit min-w-[300px]
			flex-col rounded-l-xl bg-base-100
    "
	>
		<div class="flex items-center justify-between gap-32 border-b p-4 pl-8">
			<h2 class="title">{title}</h2>
			<button on:click={close} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="grow overflow-y-scroll pl-4">
			<slot />
		</div>
	</aside>
{/if}
