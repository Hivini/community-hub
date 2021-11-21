<script>
	import { TextArea, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import http from '../../api/http';

	let petition = '';
	let petitions = [];

	async function getPetitions() {
		const response = await http.get('/request');
		console.log(response.data);
		petitions = response.data;
	}

	async function postPetition() {
		let userData = localStorage.getItem('user');
		if (userData) {
			let userObj = JSON.parse(userData);
			await http.post('/request', {
				content: petition,
				creationDate: new Date().toISOString().split('T')[0],
				houseId: userObj.houseId
			});

			petition = '';

			await getPetitions();
		}
	}

	onMount(() => {
		getPetitions();
	});
</script>

<div class="C-Petitions">
	<h4>Peticiones</h4>
	{#each petitions as petition}
		<div class="C-Petitions__petition">
			<p><span>{petition.name}</span> requiere de {petition.content}</p>
		</div>
	{/each}
</div>

<div style="margin-top:10px; padding:15px; height: auto; background-color: white;">
	<TextArea
		labelText="Enviar petición"
		bind:value={petition}
		placeholder="Escribe una petición..."
	/>
</div>
<Button style="margin-top:10px; float: right;" on:click={postPetition}>Enviar Petición</Button>

<style lang="scss">
	@import './requests.scss';
</style>
