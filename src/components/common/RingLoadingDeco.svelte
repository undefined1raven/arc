<script lang="ts">
	import { onDestroy } from 'svelte';
	import getRandomInt from '../../fn/getRandomInt';
	import globalStyle from '../../stores/globalStyles';
	import RingDeco from '../deco/RingDeco.svelte';
	import Box from './Box.svelte';
	import { getTransition } from '../../fn/getTransisitions';

	let r0 = getRandomInt(0, 5);
	let r1 = getRandomInt(0, 5);
	let r2 = getRandomInt(0, 5);

	let interval = setInterval(() => {
		r0 = getRandomInt(0, 5);
		r1 = getRandomInt(0, 5);
		r2 = getRandomInt(0, 5);
	}, 100);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<Box transitions={getTransition(1)} width="100%" height="30%" top="30%">
	<RingDeco
        crosshairStrokeWidth="0"
		strokeWidth="0.1"
		width="30%"
		height="100%"
		left="32%"
		color={$globalStyle.activeColor}
		ring={r0}
	/>
	<RingDeco
        crosshairStrokeWidth="0"
		strokeWidth="0.1"
		width="30%"
		height="100%"
		color={$globalStyle.activeColor}
		ring={r1}
	/>
	<RingDeco
        crosshairStrokeWidth="0"
		strokeWidth="0.1"
		width="30%"
		height="100%"
		left="38%"
		color={$globalStyle.activeColor}
		ring={r2}
	/>
</Box>
