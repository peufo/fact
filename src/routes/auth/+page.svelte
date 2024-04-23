<script lang="ts">
	import { Login } from 'fuma'
	import { Toaster } from 'svelte-sonner'

	import '../../app.pcss'
	import { Header } from '$lib/layout'
</script>

<Toaster />
<Header />

<div class="grid h-screen place-content-center">
	<Login />
</div>
