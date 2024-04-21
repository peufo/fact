<script lang="ts">
	type Type = $$Generic
	export let items: (Type & { id: string })[]
	let klass = ''
	export { klass as class }
</script>

<ul class="{klass} gap-2 p-4">
	{#each items as item (item.id)}
		<slot {item} />
	{:else}
		<li class="text-primary opacity-60 text-center">Aucun élément</li>
	{/each}
</ul>
