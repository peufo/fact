<script lang="ts">
	import { slide } from 'svelte/transition'
	import { mdiChevronRight } from '@mdi/js'
	import { Icon } from 'fuma'

	export let title = ''
	export let active = false
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

<div>
	{#if activable && active}
		<div class="h-4" transition:slide></div>
	{/if}

	<section
		class="{klass} flex flex-col bg-base-100"
		class:rounded-lg={!active}
		class:border={activable && !active}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={open}
			on:keyup={open}
			class="flex items-center gap-2 py-2
				{activable && !active ? 'cursor-pointer rounded-lg hover:bg-base-200/40' : ''}
			"
		>
			<slot name="title">
				{#if activable || title}
					<h2
						class="title-md origin-left pl-1 transition-transform"
						class:translate-x-4={activable && !active}
						class:scale-105={activable && active}
					>
						{title}
					</h2>
				{/if}
			</slot>
			{#if activable}
				<div class="grow" />
				<button
					type="button"
					on:click={toggle}
					class="btn btn-square btn-ghost btn-sm transition-transform"
					class:-translate-x-2={activable && !active}
				>
					<Icon path={mdiChevronRight} class="transition-transform {active ? 'rotate-90' : ''}" />
				</button>
			{/if}
		</div>

		{#if active || !activable}
			<div transition:slide|local={{ duration: 200 }} class="{contentClass} grow py-4">
				<slot />
			</div>
		{:else if persistent}
			<div class="{contentClass} hidden">
				<slot />
			</div>
		{/if}
	</section>
	{#if activable && active}
		<div class="h-8" transition:slide></div>
	{/if}
</div>
