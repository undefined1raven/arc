<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { currentDay, exfArray, logs, statusArray } from './TessVault';
	import { tasks } from '../../stores/dayViewSelectedDay';
	import Input from '../common/Input.svelte';
	import { v4 } from 'uuid';
	import { fade, fly } from 'svelte/transition';
	import { touchMove, touchStart } from '../../stores/touchGestures';
	import screenSize from '../../stores/screenSize';
	import Textarea from '../common/Textarea.svelte';
	import L5sDeco from '../deco/L5sDeco.svelte';
	import LAttributeSelector from './LAttributeSelector.svelte';
	import LAttributesEditorGrid from '../deco/LAttributesEditorGrid.svelte';
	import LAttributeRing from '../deco/LAttributeRing.svelte';
	import { createEventDispatcher } from 'svelte';
	import { allowMenuSwipe } from '../../stores/allowMenuSwpite';
	import DateInput from '../common/DateInput.svelte';
	const dispatch = createEventDispatcher();

	const containerProps = { containerWidth: 350, containerHeight: 513 };
	let leftOffset = -6;
	let crossHairRotation = 0;
	let selectedL = 'none';
	let readOnly = false;

	let positions = $currentDay.L5s !== undefined ? $currentDay.L5s : {
        L0: { x: 0, y: 0, color: '#959595' },
        L1: { x: 0, y: 0, color: '#608DFF' },
        L2: { x: 0, y: 0, color: '#1400FF' },
        L3: { x: 0, y: 0, color: '#712EFF' },
        L4: { x: 0, y: 0, color: '#BD00FF' },
        none: { x: 0, y: 0 }
    };

	onMount(() => {
		allowMenuSwipe.set(false);
		setTimeout(() => {
			crossHairRotation = 90;
		}, 40);
	});

	onDestroy(() => {
		allowMenuSwipe.set(true);
	});

	let touchStartOrigin = { x: 0, y: 0 };

	touchStart.subscribe((s) => {
		touchStartOrigin = { x: s[0].clientX, y: s[0].clientY };
	});

	let lastProcessedMove = 0;
	touchMove.subscribe((tm) => {
		if (readOnly === false) {
			if (selectedL !== 'none') {
				if (Date.now() - lastProcessedMove > 20) {
					lastProcessedMove = Date.now();
					let delta = {
						x: touchStartOrigin.x - tm[0].clientX,
						y: touchStartOrigin.y - tm[0].clientY
					};
					positions[selectedL]['x'] = delta.x;
					positions[selectedL]['y'] = delta.y;
				}
			}
			if (Date.now() - lastProcessedMove > 75) {
				currentDay.update((cd) => {
					cd['L5s'] = positions;
					return cd;
				});
			}
		}
	});

	function computeRingPosition(x, y) {
		return {
			x: ((x * 6 * 100) / $screenSize.width).toFixed(2) + '%',
			y: ((y * 6 * 100) / $screenSize.height).toFixed(2) + '%'
		};
	}

	$: L0RingDisplayPosition = computeRingPosition(positions?.L0.x, positions?.L0.y);
	$: L1RingDisplayPosition = computeRingPosition(positions?.L1.x, positions?.L1.y);
	$: L2RingDisplayPosition = computeRingPosition(positions?.L2.x, positions?.L2.y);
	$: L3RingDisplayPosition = computeRingPosition(positions?.L3.x, positions?.L3.y);
	$: L4RingDisplayPosition = computeRingPosition(positions?.L4.x, positions?.L4.y);

	export { readOnly, positions };
</script>

<Box
	figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 513 } }}
	style="overflow: hidden;"
>
	<!-- <HorizontalLine width="20%" color="{$globalStyle.activeColor}50" />
	<HorizontalLine
		width="20%"
		style="transform: rotate({crossHairRotation}deg); transition: transform ease-out 1.3s;"
		color="{$globalStyle.activeColor}50"
	/> -->
	<Box width="100%" height="100%" transitions={{ in: { func: fade, option: { duration: 1200 } } }}>
		<LAttributesEditorGrid width="100%" height="100%" color="{$globalStyle.activeColor}20" />
	</Box>

	<LAttributeRing
		style="transform: translate({L0RingDisplayPosition.x}, {L0RingDisplayPosition.y});"
		width="25vh"
		height="25vh"
		color={positions.L0.color}
	/>
	<LAttributeRing
		style="transform: translate({L1RingDisplayPosition.x}, {L1RingDisplayPosition.y});"
		e
		width="22vh"
		height="22vh"
		color={positions.L1.color}
	/>
	<LAttributeRing
		style="transform: translate({L2RingDisplayPosition.x}, {L2RingDisplayPosition.y});"
		width="18vh"
		height="18vh"
		color={positions.L2.color}
	/>
	<LAttributeRing
		style="transform: translate({L3RingDisplayPosition.x}, {L3RingDisplayPosition.y});"
		width="15vh"
		height="15vh"
		color={positions.L3.color}
	/>
	<LAttributeRing
		style="transform: translate({L4RingDisplayPosition.x}, {L4RingDisplayPosition.y});"
		width="12vh"
		height="12vh"
		color={positions.L4.color}
	/>

	<LAttributeSelector
		transitionIX={1}
		containerConfig={containerProps}
		LID="L4"
		x={positions.L4.x}
		y={positions.L4.y}
		{selectedL}
		color={positions.L4.color}
		left={21 + leftOffset}
		{readOnly}
		on:selectedL={(e) => {
			selectedL = e.detail;
		}}
	/>
	<LAttributeSelector
		transitionIX={2}
		containerConfig={containerProps}
		LID="L3"
		x={positions.L3.x}
		y={positions.L3.y}
		{selectedL}
		color={positions.L3.color}
		left={86 + leftOffset}
		{readOnly}
		on:selectedL={(e) => {
			selectedL = e.detail;
		}}
	/>
	<LAttributeSelector
		transitionIX={3}
		containerConfig={containerProps}
		LID="L2"
		x={positions.L2.x}
		{selectedL}
		y={positions.L2.y}
		color={positions.L2.color}
		left={151 + leftOffset}
		{readOnly}
		on:selectedL={(e) => {
			selectedL = e.detail;
		}}
	/>
	<LAttributeSelector
		transitionIX={4}
		containerConfig={containerProps}
		LID="L1"
		x={positions.L1.x}
		y={positions.L1.y}
		color={positions.L1.color}
		{selectedL}
		left={216 + leftOffset}
		{readOnly}
		on:selectedL={(e) => {
			selectedL = e.detail;
		}}
	/>
	<LAttributeSelector
		transitionIX={5}
		containerConfig={containerProps}
		LID="L0"
		color={positions.L0.color}
		{selectedL}
		x={positions.L0.x}
		y={positions.L0.y}
		{readOnly}
		on:selectedL={(e) => {
			selectedL = e.detail;
		}}
		left={281 + leftOffset}
	/>
</Box>
