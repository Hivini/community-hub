<script>
	import { TextArea, Button, Select, SelectItem } from 'carbon-components-svelte';
	import Post from '../components/post.svelte';
	let posts = [];
</script>

<div style="width: 80%; align-self: center;">
	<TextArea labelText="Publicar Nuevo Contenido" placeholder="Ingresa el contenido..." />
	<div>
		<Select selected="event">
			<SelectItem value="event" text="Emergencia" />
			<SelectItem value="request" text="Petición" />
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
