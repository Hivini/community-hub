<script>
	import { Button } from 'carbon-components-svelte';

	const user = JSON.parse(localStorage.getItem('user'));

	function logout() {
		localStorage.clear();
		window.location.reload();
	}
</script>

<div style="display: flex; flex-direction:column;">
	<Button style="margin-top: 16px; align-self: flex-end;" kind="danger" on:click={logout}
		>Cerrar Sesión</Button
	>
</div>

<div
	style="display:flex; flex-direction:column; margin-top:15px; background-color: white; padding: 16px;"
>
	<h1 style="font-size: 36px;">
		Hola de nuevo <strong>{user.name}</strong>
	</h1>
	<h2 style="font-size: 24px; margin-top: 10px;">
		Casa actual: <strong>{user.houseName}</strong>
	</h2>
</div>
