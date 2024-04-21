<script lang="ts">
	import UserIcon from '$lib/layout/UserIcon.svelte'
</script>

<header
	class="
		flex items-center gap-3 h-14 z-10
	bg-primary-lighter text-primary-darker  shadow-primary-light
	"
>
	<slot>
		<a href="/" class="text-xl uppercase px-2">Etude</a>
		<div class="grow" />
	</slot>
	<UserIcon />
</header>
