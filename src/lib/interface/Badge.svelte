<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { mdiClose } from '@mdi/js'
	import { Icon } from 'fuma'

	let klass = ''
	export { klass as class }
	export let removable = false

	const dispatch = createEventDispatcher<{ remove: void }>()
</script>

<span
	class="{klass} 
		bg-primary-lightest/80 flex items-center
    gap-2 rounded
    py-0.5 pl-2.5 text-xs font-medium text-primary
  "
	class:pr-2.5={!removable}
	class:pr-1={removable}
>
	<slot />
	{#if removable}
		<button class="btn btn-circle h-5 w-5" on:click={() => dispatch('remove')}>
			<Icon path={mdiClose} size={14} class="hover:bg-primary-light fill-primary stroke-none" />
		</button>
	{/if}
</span>
