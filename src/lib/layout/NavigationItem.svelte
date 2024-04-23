<script lang="ts">
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	export let href: string
	export let icon: string
	export let label: string
	export let iconClass = ''
	export let neverActive = false

	$: isActive = !neverActive && $page.url.pathname.startsWith(href)
</script>

<a {href} class="group relative cursor-pointer px-2">
	<Icon
		path={icon}
		size={26}
		class="
      bg-primary-dark fill-primary-light stroke-primary-light group-hover:fill-primary-lightest group-hover:stroke-primary-lightest block h-10
      w-10 rounded-lg
      transition-all ease-in-out group-hover:rounded-3xl
			{isActive ? 'fill-primary-lightest stroke-primary-lightest rounded-3xl' : ''}
    "
		classSVG={iconClass}
	/>
	<div
		class="
      bg-primary-dark text-primary-lightest absolute left-full top-1/2
      w-max -translate-y-1/2 translate-x-2 scale-0 rounded-lg
    px-4 py-1
      opacity-0 shadow-lg transition-all
      group-hover:scale-100 group-hover:opacity-100
    "
	>
		{label}
	</div>
</a>
