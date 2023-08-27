<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import bcryptjs from 'bcryptjs';
	import { fly } from 'svelte/transition';
	import windowHash from '../../stores/windowHash';
	import HomeActual from './HomeActual.svelte';
	import DayViewMain from '../DayView/DayViewMain.svelte';
	import LogsMain from '../Logs/LogsMain.svelte';
	import EditMain from '../Edit/EditMain.svelte';
	import { dayViewSelectedDay } from '../../stores/dayViewSelectedDay';
	import { currentActivity } from '../../stores/currentActivity';
	import SettingsMain from '../Settings/SettingsMain.svelte';

	let rendered = false;

	const validPaths = ['#home', '#dayView', '#logs', '#edit', '#settings'];

	const hashToComponent = {
		'#home': HomeActual,
		'#dayView': DayViewMain,
		'#logs': LogsMain,
		'#edit': EditMain,
		'#settings': SettingsMain
	};

	onMount(() => {
		window.location.hash = 'home';
		rendered = true;
		let cachedCurrentActivity = localStorage.getItem('currentActivity');

		if (cachedCurrentActivity !== null) {
			currentActivity.set(JSON.parse(cachedCurrentActivity));
		}
	});

	windowHash.subscribe((wh) => {
		if (wh === '#dayView' && Object.keys($dayViewSelectedDay).length === 0) {
			console.log(Object.keys($dayViewSelectedDay).length);
			window.location.hash = 'home';
		}
		if (validPaths.indexOf(wh) === -1) {
			window.location.hash = 'home';
		}
	});
</script>

<root>
	{#if rendered}
		<Box
			transitions={{
				in: { func: fly, options: { duration: 400, y: '-2%' } }
			}}
			figmaImport={{ mobile: { top: '0%', height: 19, width: '100%', left: '0%' } }}
		>
			<Logo top="10%" width="100%" height="90%" left="0%" color={$globalStyle.activeColor} />
			<HorizontalLine
				top="110%"
				style="background: radial-gradient(50% 50.00% at 50% 50.00%, #2400FF 0%, rgba(36, 0, 255, 0.10) 100%);"
				width="100%"
				height="10%"
				left="0%"
				color={$globalStyle.activeColor}
			/>
		</Box>
		<svelte:component this={hashToComponent[$windowHash]} />
	{/if}
</root>
