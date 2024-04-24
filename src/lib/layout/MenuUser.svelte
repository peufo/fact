<script lang="ts">
	import { mdiAccountOutline, mdiLogout } from '@mdi/js'
	import { DropDown, Icon } from 'fuma'

	export let user: App.Locals['user'] = null
</script>

{#if user}
	<DropDown>
		<button slot="activator" class="btn btn-sm">
			<Icon path={mdiAccountOutline} />
			<span>{user.username}</span>
		</button>

		<div class="flex flex-col gap-1">
			<form action="/auth?/logout" method="post" class="contents">
				<button class="menu-item">
					<Icon path={mdiLogout} size={18} />
					Déconexion
				</button>
			</form>
		</div>
	</DropDown>
{:else}
	<a href="/auth" class="btn btn-sm">
		<Icon path={mdiAccountOutline} />
		Connexion
	</a>
{/if}
