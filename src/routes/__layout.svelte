<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Header,
		SkipToContent,
		Content,
		HeaderNav,
		HeaderNavItem
	} from 'carbon-components-svelte';
	import { setToken } from '../api/http';
	import Login from '../components/login.svelte';
	import Register from '../components/register.svelte';
	import { isLogged, loginVerified } from '../stores/auth';

	$: {
		if (!$isLogged && !$loginVerified && typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				setToken(token);
				console.log(token);
				// Verify token
				isLogged.set(true);
				loginVerified.set(true);
			} else {
				loginVerified.set(true);
				goto('/');
			}
		}
	}
</script>

{#if $loginVerified}
	<Header company="Soldados de Vini" platformName="Community Hub">
		<div slot="skip-to-content">
			<SkipToContent />
		</div>

		<HeaderNav>
			{#if $isLogged}
				<HeaderNavItem href="/community" text="Mi Hogar" />
				<HeaderNavItem href="/chat" text="Chat" />
				<HeaderNavItem href="/events" text="Eventos" />
				<HeaderNavItem href="/requests" text="Peticiones" />
			{:else}
				<HeaderNavItem href="/register" text="Registrarme" />
				<HeaderNavItem href="/" text="Ingresar" />
			{/if}
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
{:else}
	<p>Loading...</p>
{/if}

<style lang="scss">
	@import 'layout.scss';
	@import '../global.scss';
</style>
