<script lang="ts">
	import {
		mdiAccountGroup,
		mdiFileDocumentMultipleOutline,
		mdiCalendarCheck,
		mdiLightningBolt,
		mdiLogout,
		mdiCog,
		mdiClipboardTextMultipleOutline,
		mdiFolderOpenOutline
	} from '@mdi/js'

	import { ws } from '$lib/store'
	import NavigationItem from './NavigationItem.svelte'
</script>

<nav
	style="height: calc(100vh - 50px)"
	class="sticky bottom-0 top-[50px] flex flex-col items-center gap-2 px-1 pb-2"
>
	<NavigationItem href="{$ws}/case" icon={mdiFolderOpenOutline} label="Affaires" />
	<NavigationItem href="{$ws}/contact" icon={mdiAccountGroup} label="Contacts" />
	<NavigationItem href="{$ws}/note" icon={mdiClipboardTextMultipleOutline} label="Notes" />

	<NavigationItem href="{$ws}/doc" icon={mdiFileDocumentMultipleOutline} label="Documents" />
	<NavigationItem href="{$ws}/calendar" icon={mdiCalendarCheck} label="Évenements / tâches" />

	<NavigationItem href="{$ws}/work" icon={mdiLightningBolt} label="Prestations" />

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
