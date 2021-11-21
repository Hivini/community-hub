<script>
	import {
		TextInput,
		Button,
		DatePicker,
		DatePickerInput,
		TimePicker
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import http from '../../api/http';

	let description = '';
	let date = '';
	let events = [];

	function orderEvents(ev) {
		return ev.sort((a, b) => {
			return new Date(a.eventDate) > new Date(b.eventDate) ? 1 : -1;
		});
	}

	$: orderedEvents = orderEvents(events);

	async function getEvents() {
		let response = await http.get('/community/1/event');
		events = response.data;
	}

	async function postEvent() {
		await http.post('/community/1/event', {
			description,
			datetime: new Date(`${date}`).toISOString().split('T')[0]
		});

		description = '';

		getEvents();
	}

	onMount(() => {
		getEvents();
	});
</script>

<div class="C-Events">
	<h4>Eventos</h4>
	<div>
		<div class="C-ESingle">
			{#each orderedEvents as event}
				<p>{event.eventDate.split(' ')[0]} // {event.description}</p>
			{/each}
		</div>
	</div>
</div>

<div style="margin-top:10px; padding:15px; height: auto; background-color: white;">
	<TextInput
		labelText="Nombre del evento"
		placeholder="Escribe el nombre del evento..."
		bind:value={description}
	/>

	<DatePicker
		style="margin-top:10px;"
		datePickerType="single"
		on:change={(ev) => {
			date = ev.detail.dateStr;
		}}
	>
		<DatePickerInput labelText="Día del evento" placeholder="dd/mm/yyyy" />
	</DatePicker>
</div>
<Button style="margin-top:10px; float: right;" on:click={postEvent}>Publicar</Button>

<style lang="scss">
	@import './events.scss';
</style>
