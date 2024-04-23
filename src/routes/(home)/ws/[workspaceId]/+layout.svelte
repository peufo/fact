<script lang="ts">
	import { mdiHomeCityOutline } from '@mdi/js'
	import { invalidate } from '$app/navigation'

	import { urlParam, Icon, InputSearch } from 'fuma'
	import { Header, MenuCreate, Navigation } from '$lib/layout'
	import { Drawer, type Form } from '$lib/interface'

	import CaseForm from './case/CaseForm.svelte'
	import ContactForm from './contact/ContactForm.svelte'
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
		href="/ws/{data.workspace.id}"
		class="
		bg-primary-darker text-primary-lighter hover:text-primary-lightest group flex h-full items-center gap-4
		rounded-r-lg p-2
		pr-4
		text-xl transition-all hover:rounded-r-[28px]
	"
	>
		{#if data.workspace.logo}
			<img
				src={data.workspace.logo}
				alt="Logo de l'équipe"
				class="rounded-lg transition-all group-hover:rounded-3xl"
				height="40"
				width="40"
			/>
		{:else}
			<Icon
				class="fill-primary-lighter stroke-primary-lighter h-10 w-10"
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
	<Navigation />

	<main class="flex grow flex-col">
		<slot />
	</main>
</div>

<Drawer
	bind:this={drawerCase}
	title="Nouvelle affaire"
	key="case-form"
	value="create"
	class="transition-transform 
		{$urlParam.hasValue('contact-form', 'create') ? '-translate-x-3 scale-x-105' : ''}
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
		on:success={async ({ detail: { data } }) => {
			if (!data) return
			formCase?.set('client', data.contact)
			formImplication?.set('contact', data.contact)
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
