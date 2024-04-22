<script lang="ts">
	import ActionBar from '$lib/layout/ActionBar.svelte'
	import { urlParam } from '$lib/store'
</script>

<ActionBar
	titles={['Notes']}
	createHref={$urlParam.with({ 'note-form': 'create' })}
	createLabel="Nouvelle note"
/>

<slot />
