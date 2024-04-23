<script lang="ts">
	import type { Contact } from '@prisma/client'
	import { Form } from '$lib/interface'

	export let action = ''
	export let actionDelete = ''
	export let contact: Contact | undefined = undefined
</script>

<Form
	on:success
	on:delete
	{action}
	{actionDelete}
	data={contact}
	class="max-w-lg"
	fields={[
		[
			{
				key: 'name',
				text: {
					label: 'Nom',
					input: {
						autocomplete: 'off',
						autocapitalize: 'words',
						autofocus: true
					}
				}
			},
			{
				key: 'isMoralPerson',
				boolean: {
					label: 'Personne moral',
					value: false
				}
			},
			{
				key: 'firstName',
				hide: (data) => data.isMoralPerson,
				text: {
					label: 'Prénom'
				}
			},
			{
				key: 'attentionTo',
				colSpan: 4,
				hide: (data) => !data.isMoralPerson,
				text: {
					label: `A l'attention de`
				}
			},
			{
				key: 'greeting',
				hide: (data) => data.isMoralPerson,
				text: { label: 'Titre' }
			},
			{ key: 'language', text: { label: 'Langue', value: 'Français' } },
			{
				key: 'birthday',
				hide: (data) => data.isMoralPerson,
				date: {
					label: 'Date de naissance'
				}
			}
		],
		[
			{ key: 'street', colSpan: 4, text: { label: 'Rue et numéro' } },
			{ key: 'zipCode', text: { label: 'Code postal' } },
			{ key: 'city', text: { label: 'Localité' } },
			{ key: 'country', text: { label: 'Pays', value: 'Suisse' } }
		],
		[
			{ key: 'email', colSpan: 4, text: { label: 'Email' } },
			{ key: 'phone', text: { label: 'Téléphone' } },
			{ key: 'web', text: { label: 'Site internet' } }
		],
		[
			{ key: 'iban', text: { label: 'IBAN' } },
			{ key: 'tva', text: { label: 'Numéro TVA' } }
		],
		[
			{ key: 'job', hide: (data) => data.isMoralPerson, text: { label: 'Profession' } },
			{ key: 'partner', hide: (data) => data.isMoralPerson, text: { label: 'Nom du conjoint' } },
			{ key: 'civilStatus', hide: (data) => data.isMoralPerson, text: { label: 'État civil' } },
			{ key: 'note', colSpan: 4, textarea: { label: 'Note / remarque' } }
		]
	]}
	sections={[
		{ activable: false },
		{ title: 'Adresse postale' },
		{ title: 'Contact' },
		{ title: 'Finance' },
		{ title: 'Informations complémentaires' }
	]}
/>
