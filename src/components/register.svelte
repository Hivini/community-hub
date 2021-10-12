<script>
	import { TextInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
</script>

<div class="login-box">
	<h1 style="margin-bottom: 16px;">Bienvenido</h1>
	<TextInput
		labelText="Email"
		placeholder="Ingresar tu email..."
		type="email"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Nombre de Hogar"
		placeholder="Ingresar el nombre de tu hogar..."
		type="text"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Contraseña"
		placeholder="Ingresa tu contraseña..."
		type="password"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Repetir Contraseña"
		placeholder="Ingresa tu contraseña..."
		type="password"
	/>
	<Button style="margin-top: 16px; float: right;">Registrarme</Button>
	<Button style="margin-top: 16px; float: right;" kind="secondary" href="/">Ingresar</Button>
</div>

<style>
	.login-box {
		padding: 3rem;
		width: 50%;
		margin: 0 auto;
	}
</style>
