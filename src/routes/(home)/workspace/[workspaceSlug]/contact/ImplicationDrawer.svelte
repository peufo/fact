<script lang="ts">
	import { invalidate } from '$app/navigation'
	import Drawer from '$lib/material/Drawer.svelte'
	import type Form from '$lib/material/Form.svelte'
	import type { ContactImplication } from '@prisma/client'
	import ContactImplicationForm from './ImplicationForm.svelte'

	export let title = 'Nouvelle implication'
	export let action = 'create'
	export let drawer: Drawer | undefined = undefined
	export let form: Form<any> | undefined = undefined
	export let implication: ContactImplication | undefined = undefined
</script>

<Drawer bind:this={drawer} {title} key="implication-form" value={action}>
	<ContactImplicationForm
		action="/contact/implication?/{action}"
		bind:form
		{implication}
		on:success={async () => {
			await invalidate('contact')
			await invalidate('case')
			drawer?.close()
		}}
	/>
</Drawer>
