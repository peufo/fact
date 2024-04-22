<script lang="ts">
	import { Header } from '$lib/layout'
	export let data
</script>

<Header user={data.user} workspaces={data.members.map((m) => m.workspace)} />

<h2 class="title">Hey</h2>
