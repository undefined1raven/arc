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

	let validPIN = false;
	tessPIN.subscribe((tp) => {
		if (tp.ini === true && tp.pin.length === 6) {
			validPIN = true;
		} else {
			validPIN = false;
		}
	});

	let label = '';
	let color = '';
	let decoComponent = { component: Label, props: {} };
	let onClick = () => {};
	let top = 0;
	let delayIX = 1;
	let showLock = true;
	export { delayIX, label, color, decoComponent, top, onClick, showLock };
</script>

<Box
	figmaImport={{ mobile: { top: top, left: '50%', width: 344, height: 125 } }}
	horizontalCenter={true}
	transitions={{ in: { func: fly, options: { delay: 100 * delayIX, duration: 200, y: '-4%' } } }}
>
	<Label
		text={label}
		{color}
		style="letter-spacing: 0.3vh;"
		top={showLock ? "35%" : '45%'}
		left="2%"
		verticalFont={$globalStyle.largeMobileFont}
	/>
	<Button
		onClick={() => {
			onClick();
		}}
		borderColor={color}
		backgroundColor={color}
		hoverOpacityMin={10}
		hoverOpacityMax={20}
		width="100%"
		height="100%"
	>
		<svelte:component this={decoComponent.component} {...decoComponent.props} />
		{#if showLock}
			<Box width="4vh" height="3vh" left="2%" backgroundColor="{color}20" top="50%">
				<LockDeco {color} width="70%" height="70%" />
			</Box>
		{/if}
	</Button>
</Box>
