<script lang="ts">
	import ContactCard from './Card.svelte'

	export let data
</script>

<ContactCard contact={data.contact} />
