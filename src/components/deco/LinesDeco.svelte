<script>
	import { onDestroy, onMount } from 'svelte';
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyles = gs;
	});
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let color = lglobalStyles.activeColor;

	let random = [];
	let interval;
	onMount(() => {
		interval = setInterval(() => {
			random = [];
			for (let ix = 0; ix < 12; ix++) {
				random.push(Math.random());
			}
		}, 400);
	});

	onDestroy(() => {
		if (interval !== undefined) {
			clearInterval(interval);
		}
	});

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 1 605"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="1" height="56" rx="0.5" fill={color} fill-opacity={random[0]} />
	<rect y="61" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[1]} />
	<rect y="122" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[2]} />
	<rect y="183" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[3]} />
	<rect y="244" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[4]} />
	<rect y="305" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[5]} />
	<rect y="366" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[6]} />
	<rect y="427" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[7]} />
	<rect y="488" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[8]} />
	<rect y="549" width="1" height="56" rx="0.5" fill={color} fill-opacity={random[9]} />
</svg>

<style>
	rect {
		transition: all linear 0.2s;
	}
</style>
