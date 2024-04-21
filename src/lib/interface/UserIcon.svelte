<script lang="ts">
	import { page } from '$app/stores'
</script>

{#if $page.data.session}
	<a
		href="/auth"
		class="flex gap-2 items-center pr-2"
		title="Conecter en tant que {$page.data.session.user?.name}"
	>
		{#if $page.data.session.user?.image}
			<img
				class="h-10 w-10 rounded-full"
				src={$page.data.session.user.image}
				alt="avatar utilisateur"
			/>
		{/if}
	</a>
{/if}
