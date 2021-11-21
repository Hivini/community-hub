<script>
	import { TextArea, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import http from '../../api/http';
	import Message from '../../components/message/message.svelte';
	let message = '';
	let messages = [];
	let requests = [];
	function getMessages() {
		http
			.get('/message')
			.then((res) => {
				messages = res;
			})
			.catch((e) => {
				console.log('Error at getting messages', e);
			});
	}
	function postMessage() {
		http
			.post('/message', {
				description: message,
				sentTime: new Date().toISOString().split('T')[0],
				communityId: 1,
				userId: '1'
			})
			.then((res) => {
				message = '';
				console.log(res);
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
			<Message />
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
