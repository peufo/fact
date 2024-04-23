<script lang="ts">
	import {
		mdiAccountGroup,
		mdiFolderOpen,
		mdiFileDocumentMultipleOutline,
		mdiCalendarCheck,
		mdiLightningBolt,
		mdiLogout,
		mdiCog,
		mdiClipboardTextMultipleOutline
	} from '@mdi/js'

	import { ws } from '$lib/store'
	import NavigationItem from './NavigationItem.svelte'
</script>

<nav
	class="
	  bg-primary-darker sticky top-0 z-10
		flex flex-col items-center gap-2 py-2
	"
>
	<div class="absolute top-0 h-px w-8 -translate-y-1/2 bg-primary" />

	<NavigationItem href="{$ws}/case" icon={mdiFolderOpen} label="Affaires" />
	<NavigationItem href="{$ws}/contact" icon={mdiAccountGroup} label="Contacts" />
	<NavigationItem
		href="{$ws}/note"
		icon={mdiClipboardTextMultipleOutline}
		iconClass="stroke-none"
		label="Notes"
	/>

	<NavigationItem href="{$ws}/doc" icon={mdiFileDocumentMultipleOutline} label="Documents" />
	<NavigationItem href="{$ws}/calendar" icon={mdiCalendarCheck} label="Évenements / tâches" />

	<NavigationItem
		href="{$ws}/work"
		icon={mdiLightningBolt}
		label="Prestations"
		iconClass="rotate-12"
	/>

	<div class="flex-grow" />

	<NavigationItem
		href="{$ws}/admin"
		icon={mdiCog}
		label="Configurer l'espace de travail"
		iconClass="rotate-12"
		neverActive
	/>
	<NavigationItem
		href="/"
		icon={mdiLogout}
		label="Quitter l'espace de travail"
		iconClass="rotate-180"
		neverActive
	/>
</nav>
