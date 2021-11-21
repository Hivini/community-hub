<script>
	import { Button } from 'carbon-components-svelte';

	function logout() {
		localStorage.clear();
		window.location.reload();
	}
</script>

<Button style="margin-top: 16px;" kind="danger" on:click={logout}>Cerrar Sesión</Button>
