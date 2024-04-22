<script lang="ts">
	import { Card, InputText, normalizePath, useForm } from 'fuma'

	let { enhance } = useForm({
		onFail() {
			name = normalizePath(name)
		}
	})
	let name = ''
	let workspaceId = ''
</script>

<Card class="m-auto mt-10 max-w-96">
	<h2 class="pb-4 text-xl">Nouvel espace de travail</h2>

	<form method="post" use:enhance class=" flex flex-col gap-4">
		<input type="hidden" name="id" value={workspaceId} />
		<InputText
			label="Nom de l'organisation"
			key="name"
			bind:value={name}
			on:input={() => (workspaceId = normalizePath(name))}
			input={{
				placeholder: 'Mon organisation',
				maxlength: 30
			}}
			hint="URL: /w/{workspaceId}"
		/>
		<button class="btn">Valider</button>
	</form>
</Card>
