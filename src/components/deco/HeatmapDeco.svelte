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
			for (let ix = 0; ix < 8; ix++) {
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
	viewBox="0 0 23 17"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="7" height="5" rx="2" fill={color} fill-opacity={random[0]} />
	<rect x="8" width="7" height="5" rx="2" fill={color} fill-opacity={random[0]} />
	<rect x="16" width="7" height="5" rx="2" fill={color} fill-opacity={random[1]} />
	<rect y="6" width="7" height="5" rx="2" fill={color} fill-opacity={random[2]} />
	<rect x="8" y="6" width="7" height="5" rx="2" fill={color} fill-opacity={random[3]} />
	<rect x="16" y="6" width="7" height="5" rx="2" fill={color} fill-opacity={random[4]} />
	<rect y="12" width="7" height="5" rx="2" fill={color} fill-opacity={random[5]} />
	<rect x="8" y="12" width="7" height="5" rx="2" fill={color} fill-opacity={random[6]} />
	<rect x="16" y="12" width="7" height="5" rx="2" fill={color} fill-opacity={random[7]} />
</svg>

<style>
	rect{
		transition: all ease-in-out 0.3s;
	}
</style>