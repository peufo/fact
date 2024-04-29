<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { Drawer, type Form } from 'fuma'

	import { Navigation } from '$lib/layout'

	import CaseForm from './case/CaseForm.svelte'
	import ContactForm from './contact/ContactForm.svelte'
	import RoleForm from './contact/RoleForm.svelte'
	import NoteForm from './note/NoteForm.svelte'
	import ContactImplicationDrawer from './contact/ImplicationDrawer.svelte'

	export let data

	let drawerCase: Drawer
	let drawerContact: Drawer
	let drawerNote: Drawer
	let drawerRole: Drawer

	let formCase: Form<any>
	let formImplication: Form<any>
</script>

<div style="min-height: calc(100vh - 50px)" class="flex gap-4">
	<Navigation />

	<main class="ml-14 flex grow flex-col">
		<slot />
	</main>
</div>

<Drawer bind:this={drawerCase} title="Nouvelle affaire" key="case-form" value="create">
	<CaseForm
		action="/case?/create"
		bind:form={formCase}
		data={{
			ref: data.casesCount + 1
		}}
		on:success={async () => {
			await invalidate('case')
			drawerCase.close()
		}}
	/>
</Drawer>

<Drawer bind:this={drawerNote} title="Nouvelle note" key="note-form" value="create">
	<NoteForm
		action="/note?/create"
		on:success={async () => {
			await invalidate('note')
			drawerNote.close()
		}}
	/>
</Drawer>

<ContactImplicationDrawer />

<Drawer bind:this={drawerContact} title="Nouveau contact" key="contact-form" value="create">
	<ContactForm
		action="/contact?/create"
		on:success={async ({ detail: { data } }) => {
			if (!data) return
			formCase?.set('client', data)
			formImplication?.set('contact', data)
			await invalidate('contact')
			await invalidate('case')
			drawerContact.close()
		}}
	/>
</Drawer>

<Drawer bind:this={drawerRole} title="Nouveau role" key="role-form" value="create">
	<RoleForm
		action="/contact/role?/create"
		on:success={async () => {
			drawerRole.close()
		}}
	/>
</Drawer>
