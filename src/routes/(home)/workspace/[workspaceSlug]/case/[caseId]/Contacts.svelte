<script lang="ts">
	import {
		mdiAccountCog,
		mdiAccountGroup,
		mdiAccountOutline,
		mdiAccountTie,
		mdiPlus,
		mdiSquareEditOutline,
		mdiStarOutline,
	} from '@mdi/js'

	import type { LayoutData } from './$types'
	import type { ContactImplication } from '@prisma/client'
	import { getContactLabel } from '$lib/contact'
	import { urlParam, workspacePath } from '$lib/store'
	import Badge from '$lib/material/Badge.svelte'
	import Icon from '$lib/material/Icon.svelte'
	import IconButton from '$lib/material/IconButton.svelte'
	import ListItem from '$lib/material/ListItem.svelte'
	import Section from '$lib/material/Section.svelte'
	import ContactImplicationDrawer from '../../contact/ImplicationDrawer.svelte'

	export let _case: LayoutData['case']

	let implication: ContactImplication | undefined = undefined
</script>

<Section contentClass="p-[8px]">
	<div slot="title" class="text-lg flex grow gap-2 py-2 pr-1">
		<Icon path={mdiAccountGroup} title="Personnes impliquées" />
		<div class="grow">Contacts</div>

		<div class="my-auto ml-full">
			<IconButton
				path={mdiPlus}
				size={16}
				href={$urlParam.with({ 'implication-form': 'create' })}
				title="Nouvelle implication"
				class="scale-125"
			/>
		</div>
	</div>

	<ul>
		<ListItem
			class="pl-[8px]"
			href="{$workspacePath}/contact/{_case.clientId}"
			tippyProps={{ placement: 'left' }}
		>
			<Icon path={mdiStarOutline} />
			<span class="grow">{getContactLabel(_case.client)}</span>
			<Badge>Client</Badge>
		</ListItem>

		{#each _case.contactImplications as imp}
			<ListItem
				class="pl-[8px]"
				href="{$workspacePath}/contact/{imp.contact.id}"
				title={imp.description}
				tippyProps={{ placement: 'left' }}
			>
				<Icon path={mdiAccountOutline} />
				<span class="grow">{getContactLabel(imp.contact)}</span>
				<div class="flex">
					{#each imp.roles as { name }}
						<Badge class="ml-2">{name}</Badge>
					{/each}
				</div>
				<svelte:fragment slot="afterHover">
					<IconButton
						on:click={() => (implication = imp)}
						title="Éditer l'implication du contact"
						href={$urlParam.with({ 'implication-form': 'update' })}
						path={mdiSquareEditOutline}
						size={18}
						padding={6}
					/>
				</svelte:fragment>
			</ListItem>
		{/each}

		<ListItem class="pl-[8px] opacity-50" href="{$workspacePath}/admin">
			<Icon path={mdiAccountTie} />
			<span class="grow">{_case.memberInCharge.user.name}</span>
			<Badge>Responsable</Badge>
		</ListItem>

		{#if _case.memberAdmin}
			<ListItem class="pl-[8px] opacity-50" href="{$workspacePath}/admin">
				<Icon path={mdiAccountCog} />
				<span class="grow">{_case.memberAdmin.user.name}</span>
				<Badge>Administrateur</Badge>
			</ListItem>
		{/if}
	</ul>
</Section>

<ContactImplicationDrawer title="Modifier l'implication" action="update" {implication} />
