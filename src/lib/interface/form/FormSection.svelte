<script lang="ts">
	import { slide } from 'svelte/transition'
	import { mdiChevronRight } from '@mdi/js'
	import { Icon } from 'fuma'

	export let title = ''
	export let active = false
	export let dark = false
	export let activable = false
	/** slot is juste hidden */
	export let persistent = false

	let klass = ''
	export { klass as class }
	export let contentClass = ''

	function open() {
		active = true
	}
	function toggle(event: Event) {
		event.stopPropagation()
		active = !active
	}
</script>

<section
	class="
		{klass} 
		flex flex-col rounded-lg
		{dark ? 'bg-primary-dark/30 text-primary-lightest' : 'border-primary-lightest/50 border'}
	"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={open}
		on:keyup={open}
		class="bg-primary-lighter/30 dark:bg-primary-dark/50 flex items-center gap-2 rounded-t-lg pl-4 pr-1"
		class:cursor-pointer={activable && !active}
		class:rounded-b-lg={activable && !active}
	>
		<slot name="title">
			{#if activable || title}
				<h2 class="py-2 text-lg" class:text-primary-lighter={dark}>
					{title}
				</h2>
			{/if}
		</slot>
		{#if activable}
			<div class="grow" />
			<button class="btn btn-square" on:click={toggle}>
				<Icon path={mdiChevronRight} class="transition-transform {active ? 'rotate-90' : ''}" />
			</button>
		{/if}
	</div>

	{#if active || !activable}
		<div transition:slide|local={{ duration: 200 }} class="{contentClass} grow p-4">
			<slot />
		</div>
	{:else if persistent}
		<div class="{contentClass} hidden">
			<slot />
		</div>
	{/if}
</section>
