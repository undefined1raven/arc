<script lang="ts">
	import Box from '../components/common/Box.svelte';
	import Label from '../components/common/Label.svelte';
	import Button from '../components/common/Button.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import globalStyle from '../stores/globalStyles';
	import { onMount } from 'svelte';
	import { exportCryptoKey, importPrivateKey } from '../fn/crypto/keyOps';
	import { fly } from 'svelte/transition';
	import windowHash from '../stores/windowHash';
	import LogsDeco from './deco/LogsDeco.svelte';
	import EditDeco from './deco/EditDeco.svelte';
	import SettingsDecoV2 from './deco/SettingsDeco_V2.svelte';
	import HomeDeco from './deco/HomeDeco.svelte';

	let buttons = ['logs', 'edit', 'settings'];

	let buttonTypeHash = {
		logs: { deco: LogsDeco, hash: '#logs' },
		edit: { deco: EditDeco, hash: '#edit' },
		settings: { deco: SettingsDecoV2, hash: '#settings' },
		home: { deco: HomeDeco, hash: '#home' }
	};

	export { buttons };
</script>

<Box
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	figmaImport={{ mobile: { top: 582, left: '50%', width: 350, height: 44 } }}
	horizontalCenter={true}
	backgroundColor="{$globalStyle.activeColor}00"
>
	<Button
		onClick={() => {
			window.location.hash = buttonTypeHash[buttons[0]].hash;
		}}
		left="0%"
		width="25%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={10}
		><svelte:component this={buttonTypeHash[buttons[0]].deco} width="5vh" height="5vh" /></Button
	>
	<Button
		onClick={() => {
			window.location.hash = buttonTypeHash[buttons[1]].hash;
		}}
		left="27.5%"
		width="45%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={10}
		><svelte:component this={buttonTypeHash[buttons[1]].deco} width="5vh" height="5vh" /></Button
	>
	<Button
		onClick={() => {
			window.location.hash = buttonTypeHash[buttons[2]].hash;
		}}
		left="75%"
		width="25%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={10}
		><svelte:component this={buttonTypeHash[buttons[2]].deco} width="5vh" height="5vh" /></Button
	>
</Box>
