<script lang="ts">
	export let nbChildren: number
</script>

<div class="hover rounded-xl bg-green-300/20 p-10">
	{#if nbChildren > 0}
		<svelte:self nbChildren={nbChildren - 1} />
	{/if}
</div>

<style>
	.hover:not(.hover:has(> .hover:hover)):hover {
		outline: 1px;
		outline-color: purple;
		outline-style: solid;
	}
</style>
