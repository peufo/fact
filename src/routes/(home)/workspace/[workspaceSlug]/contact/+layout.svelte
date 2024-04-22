<script lang="ts">
	import { mdiBadgeAccountHorizontalOutline, mdiBankOutline } from '@mdi/js'
	import { page } from '$app/stores'

	import { getContactLabel } from '$lib/contact'
	import ActionBar from '$lib/layout/ActionBar.svelte'
	import Icon from '$lib/material/Icon.svelte'
	import List from '$lib/material/List.svelte'
	import ContactActions from './Actions.svelte'
	import { workspacePath } from '$lib/store'
	import ListItem from '$lib/material/ListItem.svelte'

	export let data
</script>

<ActionBar
	createLabel="Nouveau contact"
	createHref="{$page.url.pathname}?contact-form=create"
	titles={['Contacts']}
/>

<div class="flex gap-4 h-full texture">
	<List items={data.contacts} let:item={contact} class="shrink-0 border-r shadow-2xl bg-white">
		{@const isActive = $page.params.contactId === contact.id}
		<ListItem {isActive} href="{$workspacePath}/contact/{contact.id}">
			<Icon
				path={contact.isMoralPerson ? mdiBankOutline : mdiBadgeAccountHorizontalOutline}
				class="fill-primary-light stroke-none"
			/>

			<span class="whitespace-nowrap grow " class:font-medium={isActive}>
				{getContactLabel(contact)}
			</span>

			<ContactActions {contact} class="ml-4 invisible group-hover:visible" />
		</ListItem>
	</List>

	<slot />
</div>

<style>
	.texture {
		background-color: #d8e5eb34;
		background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c5d0d5' fill-opacity='0.29' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
	}
</style>
