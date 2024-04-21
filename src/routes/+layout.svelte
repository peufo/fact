<script lang="ts">
	import '../app.pcss'
	import { Toaster } from 'svelte-sonner'
	import { Header } from '$lib/layout'
	export let data
</script>

<Toaster />
<Header user={data.user} />

<slot />
