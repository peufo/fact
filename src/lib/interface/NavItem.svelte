<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '$lib/material/Icon.svelte'

	export let href: string
	export let icon: string
	export let label: string
	export let iconClass = ''
	export let neverActive = false

	$: isActive = !neverActive && $page.url.pathname.startsWith(href)
</script>

<a {href} class="px-2 group cursor-pointer relative">
	<Icon
		path={icon}
		size={26}
		class="
      h-10 w-10 block rounded-lg bg-primary-dark fill-primary-light stroke-primary-light
      ease-in-out transition-all
      group-hover:rounded-3xl group-hover:fill-primary-lightest group-hover:stroke-primary-lightest
			{isActive ? 'rounded-3xl fill-primary-lightest stroke-primary-lightest' : ''}
    "
		classSVG={iconClass}
	/>
	<div
		class="
      absolute left-full translate-x-2 top-1/2 -translate-y-1/2
      px-4 py-1 rounded-lg w-max shadow-lg
    bg-primary-dark text-primary-lightest
      scale-0 opacity-0 transition-all
      group-hover:scale-100 group-hover:opacity-100
    "
	>
		{label}
	</div>
</a>
