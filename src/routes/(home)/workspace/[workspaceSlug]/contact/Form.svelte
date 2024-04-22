<script lang="ts">
	import type { Contact } from '@prisma/client'
	import Form from '$lib/material/Form.svelte'
	import { contactShema } from '$lib/shema'

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
	shema={contactShema}
	dark
	class="max-w-lg"
	messageSuccess="Nouveau contact créer"
	messageDelete="Contact supprimé"
	fields={[
		[
			{
				key: 'name',
				label: 'Nom',
				input: { type: 'text', autocomplete: 'off', autocapitalize: 'words', autofocus: true },
			},
			{
				key: 'isMoralPerson',
				label: 'Personne moral',
				value: false,
				input: {
					type: 'checkbox',
				},
			},
			{
				key: 'firstName',
				label: 'Prénom',
				hide: (data) => data.isMoralPerson,
			},
			{
				key: 'attentionTo',
				label: `A l'attention de`,
				hide: (data) => !data.isMoralPerson,
				colSpan: 4,
			},
			{ key: 'greeting', label: 'Titre', hide: (data) => data.isMoralPerson },
			{ key: 'language', label: 'Langue', value: 'Français' },
			{
				key: 'birthday',
				label: 'Date de naissance',
				hide: (data) => data.isMoralPerson,
				input: {
					type: 'date',
				},
			},
		],
		[
			{ key: 'street', label: 'Rue et numéro', colSpan: 4 },
			{ key: 'zipCode', label: 'Code postal' },
			{ key: 'city', label: 'Localité' },
			{ key: 'country', label: 'Pays', value: 'Suisse' },
		],
		[
			{ key: 'email', label: 'Email', colSpan: 4 },
			{ key: 'phone', label: 'Téléphone' },
			{ key: 'web', label: 'Site internet' },
		],
		[
			{ key: 'iban', label: 'IBAN' },
			{ key: 'tva', label: 'Numéro TVA' },
		],
		[
			{ key: 'job', label: 'Profession', hide: (data) => data.isMoralPerson },
			{ key: 'partner', label: 'Nom du conjoint', hide: (data) => data.isMoralPerson },
			{ key: 'civilStatus', label: 'État civil', hide: (data) => data.isMoralPerson },
			{ key: 'note', label: 'Note / remarque', colSpan: 4, input: { type: 'textarea' } },
		],
	]}
	sections={[
		{ activable: false },
		{ title: 'Adresse postale' },
		{ title: 'Contact' },
		{ title: 'Finance' },
		{ title: 'Informations complémentaires' },
	]}
/>
