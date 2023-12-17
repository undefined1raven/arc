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
			for (let ix = 0; ix < 7; ix++) {
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
	viewBox="0 0 26 44"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="0.930176" y="0.333252" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[0]} fill={color} />
	<rect x="10.814" y="7" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[1]} fill={color} />
	<rect x="10.814" y="40.3333" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[2]} fill={color} />
	<rect x="10.814" y="13.6665" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[3]} fill={color} />
	<rect x="10.814" y="20.3333" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[4]} fill={color} />
	<rect x="0.930176" y="27" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[5]} fill={color} />
	<rect x="0.930176" y="33.6665" width="14.8256" height="3.33333" rx="1.66667" fill-opacity={random[6]} fill={color} />
</svg>

<style>
	path,
	rect,
	circle {
		transition: all linear 0.4s;
	}
</style>
