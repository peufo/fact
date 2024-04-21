<script lang="ts">
	import { onMount } from 'svelte'
	import tippy, { type Props } from 'tippy.js'
	import 'tippy.js/dist/tippy.css'

	let klass = ''
	export { klass as class }
	export let isActive = false
	export let href = ''
	export let title: string | undefined | null = ''
	export let tippyProps: Partial<Props> = {}

	let li: HTMLLIElement
	let isHover = false

	onMount(() => {
		if (!title) return
		const tip = tippy(li, { content: title, ...tippyProps })
		return () => tip.destroy()
	})
</script>

<li
	bind:this={li}
	class:bg-primary-lightest={isActive}
	class="
		{klass} relative px-2 py-1 pl-4 flex items-center gap-2
		group rounded-lg overflow-hidden
		{href ? 'hover:bg-primary-lighter/30' : ''}
	"
	on:mouseenter={() => (isHover = true)}
	on:mouseleave={() => (isHover = false)}
>
	{#if href}
		<a {href} class="inset-0 absolute peer focus:bg-primary-lighter/30">{' '}</a>
	{/if}
	<slot />

	{#if $$slots.afterHover && isHover}
		<slot name="afterHover" />
	{/if}
</li>
