<script lang="ts">
	import { CardBasic, Form } from 'fuma'
	import { invalidate } from '$app/navigation'

	export let data
</script>

<Form
	action="/admin?/update"
	on:success={() => invalidate('workspace')}
	data={data.workspace}
	fields={[
		[
			{
				key: 'name',
				text: {
					label: 'Nom',
					input: {
						placeholder: 'Mon organisation'
					}
				}
			}
		],
		[
			{
				key: 'gedType',
				select: {
					label: 'Type de GED',
					options: ['kdrive', 'asdf']
				}
			},
			{
				key: 'gedToken',
				text: {
					label: 'Jeton de connexion',
					hint: '<a href="https://manager.infomaniak.com/v3/271263/ng/accounts/token/add" target="__blank" class="underline">Créer un jeton</a>'
				}
			}
		]
	]}
	sections={[{ title: "L'espace de travail" }, { title: 'Gestion des documents' }]}
/>

<CardBasic title="TODO">
	<ul class="list-inside list-disc">
		<li>Changement du logo</li>
		<li>Model de fichiers</li>
		<li>Gestion des membres (liste, droit, actif, etc)</li>
		<li>Gestion des étiquettes</li>
		<li>Configuration de la synchronisation des mails et des appels</li>
		<li>Meilleur gestion du changement de l'identifiant (404)</li>
		<li>Paramétrage des valeurs par défaut des formulaire (responsable, admin, ...)</li>
		<li>Cacher le token et indiquer si il est valable</li>
	</ul>
</CardBasic>
