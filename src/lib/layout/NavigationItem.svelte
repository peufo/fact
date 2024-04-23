<script lang="ts">
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	export let href: string
	export let icon: string
	export let label: string
	export let neverActive = false

	$: isActive = !neverActive && $page.url.pathname.startsWith(href)
</script>

<a {href} class="group relative cursor-pointer px-2">
	<Icon
		path={icon}
		class="
			btn btn-square btn-ghost btn-sm
			{isActive ? 'active' : ''}
    "
	/>
	<div
		class="absolute
      left-full top-1/2 w-max -translate-y-1/2 translate-x-2
      scale-0 rounded-lg bg-base-100 px-4 py-1
      opacity-0 shadow-lg transition-all
      group-hover:scale-100 group-hover:opacity-100
    "
	>
		{label}
	</div>
</a>
