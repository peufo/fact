<script lang="ts">
	import ContactCard from './ContactCard.svelte'

	export let data
</script>

<ContactCard contact={data.contact} />
