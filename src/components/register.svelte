<script>
	import { goto } from '$app/navigation';

	import { TextInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import http, { setToken } from '../api/http';
	import { isLogged } from '../stores/auth';

	let name = '';
	let house = '';
	let email = '';
	let password = '';
	let password_confirm = '';

	async function handleSubmit() {
		if (password != password_confirm) {
			alert('Passwords do not match');
			return;
		}

		let houses = await http.get('/house');
		let house_id = houses.data.find((h) => h.name == house)?.id;
		if (!house_id) {
			let new_house = await http.post('/house', { name: house, communityId: 1 });
			house_id = new_house.data.id;
		}

		await http.post('/auth/register', {
			name,
			email,
			password,
			houseId: house_id
		});

		let response = await http.post('/auth/login', {
			email,
			password
		});

		const token = response.data.token;
		setToken(token);
		localStorage.setItem('token', token);
		isLogged.set(true);
		goto('/community');
	}
</script>

<div class="login-box">
	<h1 style="margin-bottom: 16px;">Bienvenido</h1>
	<TextInput
		labelText="Nombre"
		bind:value={name}
		placeholder="Ingresar tu nombre..."
		type="text"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Hogar"
		bind:value={house}
		placeholder="Ingresar nombre de casa..."
		type="text"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Correo"
		bind:value={email}
		placeholder="Ingresar tu correo..."
		type="email"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Contraseña"
		bind:value={password}
		placeholder="Ingresa tu contraseña..."
		type="password"
		style="margin-bottom: 16px;"
	/>
	<TextInput
		labelText="Repetir Contraseña"
		bind:value={password_confirm}
		placeholder="Ingresa tu contraseña..."
		type="password"
	/>
	<Button style="margin-top: 16px; float: right;" on:click={handleSubmit}>Registrarme</Button>
	<Button style="margin-top: 16px; float: right;" kind="secondary" href="/">Ingresar</Button>
</div>

<style>
	.login-box {
		padding: 3rem;
		width: 50%;
		margin: 0 auto;
	}
</style>
