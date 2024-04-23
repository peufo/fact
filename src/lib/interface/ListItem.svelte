<script lang="ts">
	import { tip, type TippyProps } from 'fuma'
	import 'tippy.js/dist/tippy.css'

	let klass = ''
	export { klass as class }
	export let isActive = false
	export let href = ''
	export let title: string | undefined | null = ''
	export let tippyProps: Partial<TippyProps> = {}

	let isHover = false
</script>

<li
	use:tip={{ content: title || '', ...tippyProps }}
	class:bg-primary-lightest={isActive}
	class="
		{klass} group relative flex items-center gap-2 overflow-hidden rounded-lg
		px-2 py-1 pl-4
		{href ? 'hover:bg-primary-lighter/30' : ''}
	"
	on:mouseenter={() => (isHover = true)}
	on:mouseleave={() => (isHover = false)}
>
	{#if href}
		<a {href} class="focus:bg-primary-lighter/30 peer absolute inset-0">{' '}</a>
	{/if}
	<slot />

	{#if $$slots.afterHover && isHover}
		<slot name="afterHover" />
	{/if}
</li>
