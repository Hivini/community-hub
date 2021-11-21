<script>
	import {
		TextInput,
		Button,
		DatePicker,
		DatePickerInput,
		TimePicker,
		TimePickerSelect,
		SelectItem
	} from 'carbon-components-svelte';

	function postEvent() {}
</script>

<div class="C-Events">
	<h4>Eventos</h4>
	<div>
		<div class="C-ESingle">
			<h5>Today</h5>
			<p>07:00 - BBQ Party at house 14</p>
			<p>18:00 - Resource planning at main house</p>
		</div>
		<div class="C-ESingle">
			<h5>Tomorrow</h5>
			<p>09:00 - An important event</p>
			<p>20:00 - Another not that important event</p>
		</div>
	</div>
</div>

<div style="margin-top:10px; padding:15px; height: auto; background-color: white;">
	<TextInput labelText="Nombre del evento" placeholder="Escribe el nombre del evento..." />

	<DatePicker style="margin-top:10px;" datePickerType="single" on:change>
		<DatePickerInput labelText="Día del evento" placeholder="dd/mm/yyyy" />
	</DatePicker>

	<div style="margin-top: 10px;">
		<TimePicker labelText="Hora del evento" placeholder="hh:mm">
			<TimePickerSelect value="PM" style="margin-left: 5px;">
				<SelectItem value="am" text="AM" />
				<SelectItem value="pm" text="PM" />
			</TimePickerSelect>
		</TimePicker>
	</div>
</div>
<Button style="margin-top:10px; float: right;" on:click={postEvent}>Publicar</Button>

<style lang="scss">
	@import './events.scss';
</style>
