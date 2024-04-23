<script lang="ts">
	import { CardBasic } from 'fuma'
</script>

<div class="w-max-3xl mx-auto flex flex-col gap-4 p-4">
	<CardBasic title="TODO: Dashboard">
		<ul class="list-disc px-4">
			<li>Affaires courantes</li>
			<li>Dernières notes</li>
			<li>Echéances à venir</li>
		</ul>
	</CardBasic>

	<CardBasic title="TODO">
		<ul class="list-disc px-4">
			<li>Préstations</li>
			<li>Types de notes</li>
			<li>Connexion à la GED</li>
		</ul>
	</CardBasic>

	<CardBasic title="Définitions">
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

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum ipsa fugit placeat animi
			iste neque hic omnis culpa veniam. Suscipit quia adipisci similique qui alias accusantium
			voluptatibus vitae atque?
		</p>

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum ipsa fugit placeat animi
			iste neque hic omnis culpa veniam. Suscipit quia adipisci similique qui alias accusantium
			voluptatibus vitae atque?
		</p>

		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum ipsa fugit placeat animi
			iste neque hic omnis culpa veniam. Suscipit quia adipisci similique qui alias accusantium
			voluptatibus vitae atque?
		</p>
	</CardBasic>
</div>
