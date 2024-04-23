<script lang="ts">
	import {
		mdiAccountPlusOutline,
		mdiClipboardPlusOutline,
		mdiCheckboxMarkedCirclePlusOutline,
		mdiFileDocumentPlusOutline,
		mdiCalendarPlusOutline,
		mdiFolderPlusOutline,
		mdiPhonePlusOutline,
		mdiEmailPlusOutline,
		mdiMailboxUpOutline
	} from '@mdi/js'
	import { scale } from 'svelte/transition'
	import { DropDown, Icon, urlParam } from 'fuma'
	import type { NoteType } from '@prisma/client'

	let isOpen = false

	type MenuItem = {
		type: NoteType
		title: string
		path: string
	}

	const menuItems: MenuItem[] = [
		{
			type: 'document',
			title: 'Nouveau document [d]',
			path: mdiFileDocumentPlusOutline
		},
		{
			type: 'task',
			title: 'Nouvelle tâche [t]',
			path: mdiCheckboxMarkedCirclePlusOutline
		},
		{
			type: 'event',
			title: 'Nouvel évenement [e]',
			path: mdiCalendarPlusOutline
		},
		{
			type: 'phone',
			title: 'Nouveau téléphone [p]',
			path: mdiPhonePlusOutline
		},
		{
			type: 'email',
			title: 'Nouvel email [m]',
			path: mdiEmailPlusOutline
		},
		{
			type: 'mail',
			title: 'Nouveau courrier [l]',
			path: mdiMailboxUpOutline
		}
	]
</script>

<a href={$urlParam.with({ 'case-form': 'create' })} class="btn btn-square btn-ghost btn-sm">
	<Icon title="Nouvelle affaire [a]" path={mdiFolderPlusOutline} />
</a>

<a href={$urlParam.with({ 'contact-form': 'create' })} class="btn btn-square btn-ghost btn-sm">
	<Icon title="Nouveau contact [c]" path={mdiAccountPlusOutline} />
</a>

<DropDown
	tippyProps={{
		onShow() {
			isOpen = true
		},
		onHide() {
			isOpen = false
		}
	}}
>
	<a
		slot="activator"
		href={$urlParam.with({ 'note-form': 'create', type: 'note' })}
		class="btn btn-square btn-ghost btn-sm"
	>
		<Icon title="Nouvelle note [n]" path={mdiClipboardPlusOutline} tippyProps={{ delay: 500 }} />
	</a>

	{#each menuItems as { type, title, path }, index (title)}
		{#key isOpen}
			<div
				in:scale={{ delay: index * 30, duration: 260 }}
				out:scale={{ delay: (menuItems.length - index - 1) * 30, duration: 260 }}
			>
				<a href={$urlParam.with({ 'note-form': 'create', type })}>
					<Icon {title} {path} tippyProps={{ placement: 'left' }} />
				</a>
			</div>
		{/key}
	{/each}
</DropDown>
