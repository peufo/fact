<script lang="ts">
	import Section from '$lib/material/Section.svelte'
</script>

<div class="w-max-3xl mx-auto p-4 flex flex-col gap-4">
	<Section title="TODO: Dashboard">
		<ul class="list-disc px-4">
			<li>Affaires courantes</li>
			<li>Dernières notes</li>
			<li>Echéances à venir</li>
		</ul>
	</Section>

	<Section title="TODO">
		<ul class="list-disc px-4">
			<li>Préstations</li>
			<li>Types de notes</li>
			<li>Connexion à la GED</li>
		</ul>
	</Section>

	<Section title="Définitions">
		<h3 class="text-lg">note</h3>
		<ul class="list-disc px-4">
			<li>
				Peut être de type "simple" (default), "phone", "email", "mail", "document", "task", "event"
			</li>
			<li>
				Lister des pièces jointes de type BLOB (image, pdf,...), scanne des courrier par exemple
			</li>
			<li>Lister des email</li>
		</ul>

		<h3 class="text-lg">document</h3>
		<ul class="list-disc px-4">
			<li>Regroupe les liens utils vers la GED (édition, visualisation, historique)</li>
		</ul>

		<h3 class="text-lg">Synchronisation</h3>
		<ul class="list-disc px-4">
			<li>GED, Infomaniaque <a href="https://developer.infomaniak.com/docs/api">API</a></li>
			<li>Event: <a href="https://fr.wikipedia.org/wiki/CalDAV">CalDav</a></li>
			<li>Contact: <a href="https://fr.wikipedia.org/wiki/CardDAV">CardDav</a></li>
		</ul>
	</Section>
</div>
