<script>
	import { TextArea, Button, Select, SelectItem } from 'carbon-components-svelte';
	import Post from '../components/post.svelte';
	let posts = [];
	fetch('https://fakerapi.it/api/v1/texts?_quantity=10').then((res) => {
		res.json().then((parsedRes) => {
			posts = parsedRes.data;
		});
	});
</script>

<div style="width: 80%; align-self: center;">
	<TextArea labelText="Publicar Evento" placeholder="Ingresa un nuevo evento..." />
	<div>
		<Select selected="emergency">
			<SelectItem value="emergency" text="Emergencia" />
			<SelectItem value="petition" text="Petición" />
			<SelectItem value="message" text="Mensaje" />
		</Select>
		<Button style="margin-top: 16px; float: right;">Publicar</Button>
	</div>
</div>

<div style="width: 80%; align-self: center;">
	<h1>Feed</h1>
	{#each posts as post, i}
		<Post {post} />
	{/each}
</div>
