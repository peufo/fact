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
	import { ContactLabel, Badge, ListItem } from '$lib/interface'
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
		<ListItem
			class="pl-[8px]"
			href="{$ws}/contact/{_case.clientId}"
			tippyProps={{ placement: 'left' }}
		>
			<Icon path={mdiStarOutline} />
			<div class="grow">
				<ContactLabel contact={_case.client} />
			</div>
			<Badge>Client</Badge>
		</ListItem>

		{#each _case.contactImplications as imp}
			<ListItem
				class="pl-[8px]"
				href="{$ws}/contact/{imp.contact.id}"
				title={imp.description}
				tippyProps={{ placement: 'left' }}
			>
				<Icon path={mdiAccountOutline} />
				<div class="grow">
					<ContactLabel contact={imp.contact} />
				</div>
				<div class="flex">
					{#each imp.roles as { name }}
						<Badge class="ml-2">{name}</Badge>
					{/each}
				</div>
				<svelte:fragment slot="afterHover">
					<a
						href={$urlParam.with({ 'implication-form': 'update' })}
						on:click={() => (implication = imp)}
					>
						<Icon title="Éditer l'implication du contact" path={mdiSquareEditOutline} size={18} />
					</a>
				</svelte:fragment>
			</ListItem>
		{/each}

		<ListItem class="pl-[8px] opacity-50" href="{$ws}/admin">
			<Icon path={mdiAccountTie} />
			<span class="grow">{_case.memberInCharge.user.username}</span>
			<Badge>Responsable</Badge>
		</ListItem>

		{#if _case.memberAdmin}
			<ListItem class="pl-[8px] opacity-50" href="{$ws}/admin">
				<Icon path={mdiAccountCog} />
				<span class="grow">{_case.memberAdmin.user.username}</span>
				<Badge>Administrateur</Badge>
			</ListItem>
		{/if}
	</ul>
</Card>

<ContactImplicationDrawer title="Modifier l'implication" action="update" {implication} />
