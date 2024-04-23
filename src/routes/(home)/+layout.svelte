<script lang="ts">
	import '../../app.pcss'
	import { Toaster } from 'svelte-sonner'
	import { Header } from '$lib/layout'
</script>

<Toaster />
<Header />
<slot />
