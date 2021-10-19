<script>
	import { Tile } from 'carbon-components-svelte';
	export let post;
</script>

<Tile style="margin-top:10px; margin-bottom: 10px;">
	<strong>{post.author}</strong>
	<p>
		{post.title}
	</p>
</Tile>
