<script>
	import { goto } from '$app/navigation';
	import { TextInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import { isLogged } from '../stores/auth';

	$: {
		if ($isLogged) {
			goto('/community');
		}
	}

	function handleSubmit() {
		isLogged.set(true);
	}
</script>

<div class="login-box">
	<h1 style="margin-bottom: 16px;">Bienvenido</h1>
	<TextInput
		labelText="Email"
		placeholder="Ingresar tu email..."
		type="email"
		style="margin-bottom: 16px;"
	/>
	<TextInput labelText="Contraseña" placeholder="Ingresa tu contraseña..." type="password" />
	<Button style="margin-top: 16px; float: right;" on:click={handleSubmit}>Ingresar</Button>
	<Button style="margin-top: 16px; float: right;" kind="secondary" href="/register"
		>Registrarme</Button
	>
</div>

<style>
	.login-box {
		padding: 3rem;
		width: 50%;
		margin: 0 auto;
	}
</style>
