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
		mdiMailboxUpOutline,
	} from '@mdi/js'
	import { debounce } from '$lib/debounce'
	import { scale } from 'svelte/transition'

	import { urlParam } from '$lib/store'
	import IconButton from '$lib/material/IconButton.svelte'
	import type { NoteType } from '@prisma/client'

	const IconClass = 'bg-primary-lightest hover:outline outline-1 outline-primary'

	let noteMenuActive = false

	const handleMouseEnter = () => {
		handleMouseLeave.clear()
		noteMenuActive = true
	}
	const handleMouseLeave = debounce(() => {
		noteMenuActive = false
	}, 400)

	type NoteMenuItem = {
		type: NoteType
		title: string
		path: string
	}

	const noteMenuItems: NoteMenuItem[] = [
		{
			type: 'document',
			title: 'Nouveau document [d]',
			path: mdiFileDocumentPlusOutline,
		},
		{
			type: 'task',
			title: 'Nouvelle tâche [t]',
			path: mdiCheckboxMarkedCirclePlusOutline,
		},
		{
			type: 'event',
			title: 'Nouvel évenement [e]',
			path: mdiCalendarPlusOutline,
		},
		{
			type: 'phone',
			title: 'Nouveau téléphone [p]',
			path: mdiPhonePlusOutline,
		},
		{
			type: 'email',
			title: 'Nouvel email [m]',
			path: mdiEmailPlusOutline,
		},
		{
			type: 'mail',
			title: 'Nouveau courrier [l]',
			path: mdiMailboxUpOutline,
		},
	]
</script>

<div class="flex gap-3 fill-primary-light stroke-none">
	<IconButton
		href={$urlParam.with({ 'case-form': 'create' })}
		title="Nouvelle affaire [a]"
		path={mdiFolderPlusOutline}
		class={IconClass}
	/>
	<IconButton
		href={$urlParam.with({ 'contact-form': 'create' })}
		title="Nouveau contact [c]"
		path={mdiAccountPlusOutline}
		class={IconClass}
	/>

	<div class="relative" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
		<IconButton
			href={$urlParam.with({ 'note-form': 'create', type: 'note' })}
			title="Nouvelle note [n]"
			path={mdiClipboardPlusOutline}
			class={IconClass}
			tippyProps={{ delay: 500 }}
		/>

		{#if noteMenuActive}
			<div class="absolute top-full flex flex-col gap-2 translate-y-2">
				{#each noteMenuItems as { type, title, path }, index (title)}
					{#key noteMenuActive}
						<div
							in:scale={{ delay: index * 30, duration: 260 }}
							out:scale={{ delay: (noteMenuItems.length - index - 1) * 30, duration: 260 }}
						>
							<IconButton
								href={$urlParam.with({ 'note-form': 'create', type })}
								{title}
								{path}
								class={IconClass}
								tippyProps={{ placement: 'left' }}
							/>
						</div>
					{/key}
				{/each}
			</div>
		{/if}
	</div>
</div>
