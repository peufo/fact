<script lang="ts">
	import CaseCard from './Card.svelte'

	export let data
</script>

<CaseCard _case={data.case} />
