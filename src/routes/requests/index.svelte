<script>
	import { TextArea, Button } from 'carbon-components-svelte';
</script>

<div class="C-Petitions">
	<h4>Peticiones</h4>
</div>

<div style="margin-top:10px; padding:15px; height: auto; background-color: white;">
	<TextArea labelText="Enviar petición" placeholder="Escribe una petición..." />
</div>
<Button style="margin-top:10px; float: right;">Enviar Petición</Button>

<style lang="scss">
	@import './requests.scss';
</style>
