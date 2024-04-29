<script lang="ts">
	import {
		mdiAccountCog,
		mdiAccountGroup,
		mdiAccountOutline,
		mdiAccountTie,
		mdiPlus,
		mdiSquareEditOutline,
		mdiStarOutline
	} from '@mdi/js'
	import { urlParam, Icon, Card } from 'fuma'
	import type { LayoutData } from './$types'
	import type { ContactImplication } from '@prisma/client'

	import { ws } from '$lib/store'
	import { ContactLabel, Badge } from '$lib/interface'
	import ContactImplicationDrawer from '../../contact/ImplicationDrawer.svelte'

	export let _case: LayoutData['case']

	let implication: ContactImplication | undefined = undefined
</script>

<Card>
	<div slot="title" class="flex grow gap-2 py-2 pr-1 text-lg">
		<Icon path={mdiAccountGroup} title="Personnes impliquées" />
		<div class="grow">Contacts</div>

		<div class="ml-full my-auto">
			<a href={$urlParam.with({ 'implication-form': 'create' })}>
				<Icon path={mdiPlus} size={16} title="Nouvelle implication" class="scale-125" />
			</a>
		</div>
	</div>

	<ul>
		<li class="pl-[8px]">
			<a href="{$ws}/contact/{_case.clientId}" class="menu-item">
				<Icon path={mdiStarOutline} />
				<div class="grow">
					<ContactLabel contact={_case.client} />
				</div>
				<Badge>Client</Badge>
			</a>
		</li>

		{#each _case.contactImplications as imp}
			<li class="menu-item group pl-[8px]">
				<a href="{$ws}/contact/{imp.contact.id}">
					<Icon path={mdiAccountOutline} />
					<div class="grow">
						<ContactLabel contact={imp.contact} />
					</div>
					<div class="flex">
						{#each imp.roles as { name }}
							<Badge class="ml-2">{name}</Badge>
						{/each}
					</div>
				</a>

				<a
					class="hidden group-hover:block"
					href={$urlParam.with({ 'implication-form': 'update' })}
					on:click={() => (implication = imp)}
				>
					<Icon title="Éditer l'implication du contact" path={mdiSquareEditOutline} size={18} />
				</a>
			</li>
		{/each}

		<li class="pl-[8px] opacity-50">
			<a href="{$ws}/admin" class="menu-item">
				<Icon path={mdiAccountTie} />
				<span class="grow">{_case.memberInCharge.user.username}</span>
				<Badge>Responsable</Badge>
			</a>
		</li>

		{#if _case.memberAdmin}
			<li class="pl-[8px] opacity-50">
				<a href="{$ws}/admin" class="menu-item">
					<Icon path={mdiAccountCog} />
					<span class="grow">{_case.memberAdmin.user.username}</span>
					<Badge>Administrateur</Badge>
				</a>
			</li>
		{/if}
	</ul>
</Card>

<ContactImplicationDrawer title="Modifier l'implication" action="update" {implication} />
