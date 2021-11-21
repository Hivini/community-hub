<script>
	export let message;
</script>

<div class="C-Message">
	<div class="C-MHeader">
		<p class="C-MHName">{message.name}</p>
		<p class="C-MHTime">{new Date(message.sentTime).toLocaleDateString()}</p>
	</div>
	<div class="C-MContent">
		<p>{message.description}</p>
	</div>
</div>

<style lang="scss">
	@import './message.scss';
</style>
