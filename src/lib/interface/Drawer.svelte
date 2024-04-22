<script lang="ts">
	import { fly } from 'svelte/transition'
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
		class="bg-primary-dark/40 fixed inset-0 z-10 backdrop-blur-[2px]"
	/>

	<aside
		transition:fly|local={{ x: 500, duration: 200 }}
		class="{klass}
      text-primary-lighter fill-primary-lighter stroke-primary-lighter fixed bottom-0 right-0 top-0
      z-10 flex
      w-fit min-w-[300px] flex-col bg-primary/90
    "
	>
		<div class="border-primary-dark flex items-center justify-between gap-32 border-b p-4">
			<h2 class="text-xl font-medium uppercase tracking-wider opacity-70">{title}</h2>
			<button on:click={close} class="btn btn-square btn-sm">
				<Icon path={mdiClose} title="annuler" />
			</button>
		</div>

		<div class="grow overflow-auto">
			<slot />
		</div>
	</aside>
{/if}
