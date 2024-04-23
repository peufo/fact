<script lang="ts">
	import { mdiSquareEditOutline } from '@mdi/js'
	import { Icon } from 'fuma'

	import type { Case } from '@prisma/client'
	import { ws } from '$lib/store'

	let klass = ''
	export { klass as class }

	export let _case: Case
</script>

<div class="{klass} fill-primary-light flex items-center gap-1 stroke-none">
	<a href="{$ws}/case/{_case.id}?case-form=update">
		<Icon path={mdiSquareEditOutline} title="Editer l'affaire" class="focus:opacity-100" />
	</a>
</div>
