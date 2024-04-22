<script lang="ts">
	import ActionBar from '$lib/layout/ActionBar.svelte'
</script>

<ActionBar titles={["Configuration de l'espace de travail"]} />
<div class="grow mx-auto max-w-3xl p-4">
	<slot />
</div>
