<script>
	import { fly } from 'svelte/transition';
	import { appColors } from '../../config/appColors';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { onMount } from 'svelte';
	import Box from '../common/Box.svelte';
	import { activeApp } from '../../stores/activeApp';
	import TessDeco from '../deco/TessDeco.svelte';
	import SidDeco from '../deco/SIDDeco.svelte';
	import LockDeco from '../deco/LockDeco.svelte';
	import SyncingDeco from '../deco/SyncingDeco.svelte';
	import { tessPIN } from '../../stores/tessPIN';
	import globalStyle from '../../stores/globalStyles';
	import MenuItem from './MenuItem.svelte';
	import StarDeco from '../deco/StarDeco.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	
	let rendered = false;
	onMount(() => {
		window.location.hash = '#home';
		rendered = true;
	});

	let validPIN = false;

	tessPIN.subscribe((tp) => {
		if (tp.ini === true && tp.pin.length === 6) {
			validPIN = true;
		} else {
			validPIN = false;
		}
	});
</script>

<MenuItem
	delayIX={1}
	label="Tess"
	color={appColors.tess.activeColor}
	decoComponent={{ component: TessDeco, props: { width: '35%', height: '60%', left: '65%' } }}
	onClick={() => {
		activeApp.set('tess');
	}}
	top={28}
/>

<MenuItem
	label="SID Vault"
	delayIX={2}
	color={appColors.sid.activeColor}
	decoComponent={{
		component: SidDeco,
		props: { width: '35%', height: '60%', left: '65%', color: appColors.sid.activeColor }
	}}
	onClick={() => {
		activeApp.set('sid');
	}}
	top={168}
/>

<MenuItem
	label="ARC"
	delayIX={3}
	showLock={false}
	color={appColors.arc.activeColor}
	decoComponent={{
		component: SyncingDeco,
		props: { width: '35%', height: '60%', left: '65%', color: appColors.arc.activeColor }
	}}
	onClick={() => {
		activeApp.set('arc');
	}}
	top={308}
/>

<MenuItem
	label="Star Vault"
	delayIX={4}
	color={appColors.star.activeMono}
	decoComponent={{
		component: StarDeco,
		props: { width: '35%', height: '60%', left: '65%', color: appColors.star.activeMono }
	}}
	onClick={() => {
		activeApp.set('star');
	}}
	top={448}
/>

<Label
	width="80%"
	top="92%"
	horizontalCenter={true}
	left="50%"
	transitions={getTransition(2)}
	backgroundColor="{$globalStyle.activeColor}20"
	height="6%"
	color={$globalStyle.activeMono}
	verticalFont={$globalStyle.mediumMobileFont}
	text="Swipe right (->) to bring up this menu at any time"
/>
