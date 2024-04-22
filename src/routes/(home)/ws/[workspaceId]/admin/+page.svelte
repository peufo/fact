<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { workspaceShema } from '$lib/shema'
	import Form from '$lib/material/Form.svelte'
	import Section from '$lib/material/Section.svelte'

	export let data
</script>

<Form
	action="/admin?/update"
	on:success={() => invalidate('workspace')}
	data={data.workspace}
	shema={workspaceShema}
	fields={[
		[
			{ key: 'name', label: 'Nom', input: { type: 'text', placeholder: 'Mon organisation' } },
			{
				key: 'slug',
				label: 'Identifiant',
				input: { type: 'text', placeholder: 'mon-organisation' },
			},
			// { key: 'logo', label: 'Logo', colSpan: 4, input: { type: 'file' } },
		],
		[
			{ key: 'gedType', label: 'Type', input: { type: 'select', items: ['kdrive', 'asdf'] } },
			{
				key: 'gedToken',
				label: 'Jeton de connexion',
				hint: '<a href="https://manager.infomaniak.com/v3/271263/ng/accounts/token/add" target="__blank" class="underline">Créer un jeton</a>',
			},
		],
	]}
	sections={[
		{ title: "L'espace de travail", activable: false },
		{ title: 'Gestion des documents', activable: false },
	]}
/>

<Section title="TODO">
	<ul class="list-disc list-inside ">
		<li>Changement du logo</li>
		<li>Model de fichiers</li>
		<li>Gestion des membres (liste, droit, actif, etc)</li>
		<li>Gestion des étiquettes</li>
		<li>Configuration de la synchronisation des mails et des appels</li>
		<li>Meilleur gestion du changement de l'identifiant (404)</li>
		<li>Paramétrage des valeurs par défaut des formulaire (responsable, admin, ...)</li>
		<li>Cacher le token et indiquer si il est valable</li>
	</ul>
</Section>
