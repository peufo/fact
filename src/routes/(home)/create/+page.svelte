<script lang="ts">
	import { Card, InputText, normalizePath, useForm } from 'fuma'

	let { enhance } = useForm()
	let name = ''
	let slug = ''
</script>

<Card class="m-auto mt-10 max-w-96">
	<h2 class="pb-4 text-xl">Nouvel espace de travail</h2>

	<form method="post" use:enhance class=" flex flex-col gap-4">
		<InputText
			label="Nom de l'organisation"
			key="name"
			on:input={() => (slug = normalizePath(name))}
			bind:value={name}
			input={{
				placeholder: 'Mon organisation',
				maxlength: 30
			}}
		/>
		<InputText
			label="Identifiant"
			key="slug"
			hint="Identifiant unique utilisé dans l'URL"
			bind:value={slug}
			input={{
				placeholder: 'mon-organisation',
				maxlength: 30
			}}
		/>

		<button class="btn">Valider</button>
	</form>
</Card>
