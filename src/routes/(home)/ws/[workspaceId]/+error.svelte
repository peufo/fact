<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="grow grid place-content-center w-full p-4">
	<div class="rounded-lg p-8 bg-primary-lighter text-center">
		<h2 class="text-lg">
			{$page.error?.message}
		</h2>
	</div>
</div>
