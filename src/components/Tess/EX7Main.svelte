<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import Ex7Home from './EX7Home.svelte';
	import Ex7CurrentDay from './EX7CurrentDay.svelte';
	import Ex7logs from './ex7logs.svelte';

	const hashToComponent = {
		'#login': Login,
		'#home': Ex7Home
	};

	tessPIN.subscribe((tp) => {
		if (tp.ini === false || Math.abs(Date.now() - tp.tx) > 20 * 60 * 1000) {
			window.location.hash = 'login';
		} else {
			window.location.hash = 'home';
		}
	});
</script>

<svelte:component this={hashToComponent[$windowHash]} />
