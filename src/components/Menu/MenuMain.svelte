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

	let rendered = false;
	onMount(() => {
		rendered = true;
	});
</script>

<Button
	onClick={() => {
		activeApp.set('tess');
	}}
	borderColor={appColors.tess.activeColor}
	backgroundColor={appColors.tess.activeColor}
	hoverOpacityMin={10}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 28, left: '50%', width: 344, height: 159 } }}
	transitions={{ in: { func: fly, options: { duration: 200, y: '-4%' } } }}
	horizontalCenter={true}
	><Label
		text="TESS-AVN"
		color={appColors.tess.activeColor}
		style="letter-spacing: 0.8vh;"
		top="15%"
	/><TessDeco width="40%" height="50%" color={appColors.tess.activeColor} top="48%" />
	<Box width="3.3vh" height="3.3vh" backgroundColor="{appColors.tess.activeColor}40" top="30%">
		<LockDeco color={appColors.tess.activeColor} width="2vh" height="2vh" />
	</Box>
</Button>
<Button
	borderColor={appColors.sid.activeColor}
	backgroundColor={appColors.sid.activeColor}
	hoverOpacityMin={10}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 198, left: '50%', width: 344, height: 159 } }}
	transitions={{ in: { func: fly, options: { delay: 100, duration: 200, y: '-4%' } } }}
	horizontalCenter={true}
	><Label
		text="SID Vault"
		color={appColors.sid.activeColor}
		style="letter-spacing: 0.8vh;"
		top="15%"
	/>
	<Box width="3.3vh" height="3.3vh" backgroundColor="{appColors.sid.activeColor}40" top="30%">
		<LockDeco color={appColors.sid.activeColor} width="2vh" height="2vh" />
	</Box>
	<SidDeco width="40%" height="50%" color={appColors.sid.activeColor} top="48%" /></Button
>
<Button
	onClick={() => {
		activeApp.set('arc');
	}}
	borderColor={appColors.arc.activeColor}
	backgroundColor={appColors.arc.activeColor}
	hoverOpacityMin={10}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 368, left: '50%', width: 344, height: 159 } }}
	transitions={{ in: { func: fly, options: { delay: 200, duration: 200, y: '-4%' } } }}
	horizontalCenter={true}
	><Label text="ARC" color={appColors.arc.activeColor} style="letter-spacing: 0.8vh;" top="15%" />
	<SyncingDeco width="40%" height="50%" top="40%" /></Button
>
