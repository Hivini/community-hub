<script>
	import { page } from '$app/stores';
	import {
		Header,
		SkipToContent,
		Content,
		HeaderNav,
		HeaderNavItem
	} from 'carbon-components-svelte';
	import Login from '../components/login.svelte';
	import Register from '../components/register.svelte';
	import { isLogged } from '../stores/auth';
</script>

<Header company="Soldados de Vini" platformName="Community Hub">
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<HeaderNav>
		<HeaderNavItem href="/home" text="Mi Hogar" />
		<HeaderNavItem href="/community" text="Mi Comunidad" />
		<HeaderNavItem href="/register" text="Registrarme" />
		<HeaderNavItem href="/" text="Ingresar" />
	</HeaderNav>
</Header>

<Content>
	{#if $isLogged}
		<slot />
	{:else if $page.path === '/register'}
		<Register />
	{:else}
		<Login />
	{/if}
</Content>

<style lang="scss">
	@import 'layout.scss';
	@import '../global.scss';
</style>
