<script lang="ts">
	import CaseCard from './CaseCard.svelte'

	export let data
</script>

<CaseCard _case={data.case} />
