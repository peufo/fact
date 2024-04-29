<script lang="ts">
	import { mdiBadgeAccountHorizontalOutline, mdiBankOutline } from '@mdi/js'
	import { page } from '$app/stores'
	import { Icon } from 'fuma'

	import { ContactLabel } from '$lib/interface'
	import { ws } from '$lib/store'

	export let data
</script>

<div class="flex h-full gap-1">
	<div class="rounded-lg border p-1">
		<h2 class="title-md px-3 py-2">Contacts</h2>

		<ul class="flex flex-col gap-1">
			{#each data.contacts as contact}
				{@const active = $page.params.contactId === contact.id}
				<li>
					<a href="{$ws}/contact/{contact.id}" class="menu-item text-sm" class:active>
						<Icon
							size={18}
							path={contact.isMoralPerson ? mdiBankOutline : mdiBadgeAccountHorizontalOutline}
						/>
						<ContactLabel {contact} class="grow whitespace-nowrap" />
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="grow">
		<slot />
	</div>
</div>
