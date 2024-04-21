<script lang="ts">
	import Input from '$lib/interface/form/Input.svelte'
</script>

<Input type="textarea" textarea={{ rows: 10, placeholder: 'prout' }} />

<Input type="date" value={new Date()} />
