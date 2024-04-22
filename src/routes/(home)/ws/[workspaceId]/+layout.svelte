<script lang="ts">
	import { mdiHomeCityOutline } from '@mdi/js'
	import { invalidate } from '$app/navigation'

	import { urlParam, Icon, InputSearch  } from 'fuma'
	import { Header, MenuCreate /* Navbar*/ } from '$lib/layout'
	import type  { Form } from '$lib/interface'

	import Drawer from '$lib/material/Drawer.svelte'
	
	import CaseForm from './case/Form.svelte'
	import ContactForm from './contact/Form.svelte'
	import RoleForm from './contact/RoleForm.svelte'
	import NoteForm from './note/Form.svelte'
	import ContactImplicationDrawer from './contact/ImplicationDrawer.svelte'

	export let data

	let drawerCase: Drawer
	let drawerContact: Drawer
	let drawerNote: Drawer
	let drawerRole: Drawer

	let formCase: Form<any>
	let formImplication: Form<any>
</script>

<Header>
	<a
		href="/workspace/{data.workspace.slug}"
		class="
		text-xl flex gap-4 items-center h-full p-2 pr-4 group
		bg-primary-darker text-primary-lighter
		rounded-r-lg 
		hover:rounded-r-[28px] hover:text-primary-lightest transition-all
	"
	>
		{#if data.workspace.logo}
			<img
				src={data.workspace.logo}
				alt="Logo de l'équipe"
				class="rounded-lg group-hover:rounded-3xl transition-all"
				height="40"
				width="40"
			/>
		{:else}
			<Icon
				class="w-10 h-10 fill-primary-lighter stroke-primary-lighter"
				path={mdiHomeCityOutline}
			/>
		{/if}
		<span>{data.workspace.name}</span>
	</a>

	<div class="grow" />

	<InputSearch />

	<MenuCreate />
</Header>

<div class="flex grow overflow-auto">
	<Navbar />

	<main class="grow flex flex-col">
		<slot />
	</main>
</div>

<Drawer
	bind:this={drawerCase}
	title="Nouvelle affaire"
	key="case-form"
	value="create"
	class="transition-transform 
		{$urlParam.hasValue('contact-form', 'create') ? 'scale-x-105 -translate-x-3' : ''}
	"
>
	<CaseForm
		action="/case?/create"
		nextRef={data.casesCount + 1}
		bind:form={formCase}
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
		on:success={async ({ detail: contact }) => {
			formCase?.set('clientId', contact.id)
			formImplication?.set('contactId', contact.id)
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
