<script>
	import { goto } from '$app/navigation';
	import { TextInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import http, { setToken } from '../api/http';
	import { isLogged } from '../stores/auth';

	let email = '';
	let password = '';

	$: {
		if ($isLogged) {
			goto('/community');
		}
	}

	function handleSubmit() {
		http
			.post('/auth/login', {
				email,
				password
			})
			.then((res) => {
				console.log('login response:', res);
				const token = res.data.token;
				setToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				isLogged.set(true);
				goto('/community');
			})
			.catch(() => {
				alert('Invalid email or password');
			});
	}
</script>

<div class="login-box">
	<h1 style="margin-bottom: 16px;">Bienvenido</h1>
	<TextInput
		labelText="Email"
		bind:value={email}
		placeholder="Ingresar tu email..."
		type="email"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Contraseña"
		bind:value={password}
		placeholder="Ingresa tu contraseña..."
		type="password"
	/>
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
