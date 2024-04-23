<script lang="ts">
	import { urlParam } from 'fuma'
	import { ActionBar } from '$lib/interface'
</script>

<ActionBar
	titles={['Notes']}
	createHref={$urlParam.with({ 'note-form': 'create' })}
	createLabel="Nouvelle note"
/>

<slot />
