<script>
	import { TextArea, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import http from '../../api/http';
	import Message from '../../components/message/message.svelte';
	let message = '';
	let messages = [];
	function getMessages() {
		http
			.get('/message')
			.then((res) => {
				messages = res.data;
				console.log(messages);
			})
			.catch((e) => {
				console.log('Error at getting messages', e);
			});
	}
	function postMessage() {
		const userString = localStorage.getItem('user');
		const user = JSON.parse(userString);
		http
			.post('/message', {
				description: message,
				sentTime: new Date().toISOString().split('T')[0],
				communityId: 1,
				userId: user.id
			})
			.then((res) => {
				message = '';
				console.log(res);
				getMessages();
			})
			.catch((e) => {
				console.log('Error at sending message', e);
			});
	}
	onMount(() => {
		getMessages();
	});
</script>

<div>
	<div class="C-Chat">
		<h4>Chat</h4>
		<div>
			{#each messages as message, i}
				<Message {message} />
			{/each}
		</div>
	</div>
	<div style="margin-top:10px; padding:15px; height: auto; background-color: white;">
		<TextArea labelText="Enviar mensaje" placeholder="Escribe un mensaje..." bind:value={message} />
	</div>
	<Button style="margin-top:10px; float: right;" on:click={postMessage}>Enviar</Button>
</div>

<style lang="scss">
	@import './chat.scss';
</style>
