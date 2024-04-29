<script lang="ts">
	import { mdiBadgeAccountHorizontalOutline, mdiBankOutline } from '@mdi/js'
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	import { ContactLabel } from '$lib/interface'
	import { ws } from '$lib/store'
	import ContactActions from './Actions.svelte'

	export let data
</script>

<div class="texture flex h-full gap-4">
	<ul class="shrink-0 border-r bg-white shadow-2xl">
		{#each data.contacts as contact}
			{@const active = $page.params.contactId === contact.id}
			<li>
				<a href="{$ws}/contact/{contact.id}" class="menu-item" class:active>
					<Icon
						path={contact.isMoralPerson ? mdiBankOutline : mdiBadgeAccountHorizontalOutline}
						class="fill-primary-light stroke-none"
					/>
					<ContactLabel {contact} class="grow whitespace-nowrap {active ? 'font-medium' : ''}" />
					<ContactActions {contact} class="invisible ml-4 group-hover:visible" />
				</a>
			</li>
		{/each}
	</ul>

	<slot />
</div>

<style>
	.texture {
		background-color: #d8e5eb34;
		background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c5d0d5' fill-opacity='0.29' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
	}
</style>
