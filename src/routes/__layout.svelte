<script>
	import {
		Header,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent,
		Content,
		HeaderNav,
		HeaderNavItem
	} from 'carbon-components-svelte';

	let isSideNavOpen = false;
</script>

<Header company="Soldados de Vini" platformName="Community Hub" bind:isSideNavOpen>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<HeaderNav>
		<HeaderNavItem href="/register" text="Registrarme" />
		<HeaderNavItem href="/" text="Ingresar" />
	</HeaderNav>

	<SideNav bind:isOpen={isSideNavOpen} rail>
		<SideNavItems>
			<SideNavLink text="Mi Hogar" href="/hogar" />
			<SideNavLink text="Mi Comunidad" href="/comunidad" />
		</SideNavItems>
	</SideNav>
</Header>

<Content>
	<slot />
</Content>

<style lang="scss">
	@import 'layout.scss';
</style>
