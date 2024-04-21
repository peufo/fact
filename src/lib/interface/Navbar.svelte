<script lang="ts">
	import {
		mdiAccountGroup,
		mdiFolderOpen,
		mdiFileDocumentMultipleOutline,
		mdiClipboardTextOutline,
		mdiCalendarCheck,
		mdiLightningBolt,
		mdiLogout,
		mdiCog,
		mdiClipboardTextMultipleOutline,
	} from '@mdi/js'

	import NavItem from '$lib/layout/NavItem.svelte'
	import { workspacePath } from '$lib/store'
</script>

<nav
	class="
	  sticky top-0 z-10
		flex flex-col items-center gap-2 py-2 
	bg-primary-darker 
	"
>
	<div class="h-px w-8 -translate-y-1/2 absolute top-0 bg-primary " />

	<NavItem href="{$workspacePath}/case" icon={mdiFolderOpen} label="Affaires" />
	<NavItem href="{$workspacePath}/contact" icon={mdiAccountGroup} label="Contacts" />
	<NavItem
		href="{$workspacePath}/note"
		icon={mdiClipboardTextMultipleOutline}
		iconClass="stroke-none"
		label="Notes"
	/>

	<NavItem href="{$workspacePath}/doc" icon={mdiFileDocumentMultipleOutline} label="Documents" />
	<NavItem href="{$workspacePath}/calendar" icon={mdiCalendarCheck} label="Évenements / tâches" />

	<NavItem
		href="{$workspacePath}/work"
		icon={mdiLightningBolt}
		label="Prestations"
		iconClass="rotate-12"
	/>

	<div class="flex-grow" />

	<NavItem
		href="{$workspacePath}/admin"
		icon={mdiCog}
		label="Configurer l'espace de travail"
		iconClass="rotate-12"
		neverActive
	/>
	<NavItem
		href="/"
		icon={mdiLogout}
		label="Quitter l'espace de travail"
		iconClass="rotate-180"
		neverActive
	/>
</nav>
