<script lang="ts">
	import type { Contact } from '@prisma/client'

	export let contact: Contact
	let klass = ''
	export { klass as class }

	function getContactLabel(c: Contact): string {
		if (c.isMoralPerson) return [c.name, c.attentionTo].filter(Boolean).join(' ')
		return [c.greeting, c.firstName, c.name].filter(Boolean).join(' ')
	}
</script>

<span class={klass}>{getContactLabel(contact)}</span>
