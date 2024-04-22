<script lang="ts">
	import { mdiSquareEditOutline } from '@mdi/js'

	import type { Case } from '@prisma/client'
	import { workspacePath } from '$lib/store'
	import IconButton from '$lib/material/IconButton.svelte'

	let klass = ''
	export { klass as class }

	export let _case: Case
</script>

<div class="{klass} flex items-center gap-1 fill-primary-light stroke-none">
	<IconButton
		path={mdiSquareEditOutline}
		title="Editer l'affaire"
		href="{$workspacePath}/case/{_case.id}?case-form=update"
		class="focus:opacity-100"
	/>
</div>
