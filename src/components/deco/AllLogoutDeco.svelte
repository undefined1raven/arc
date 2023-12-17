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
			for (let ix = 0; ix < 5; ix++) {
				random.push(Math.max(Math.random(), 0.5));
			}
		}, 300);
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
	viewBox="0 0 25 27"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="3" y="7" width="12.8889" height="20" rx="2" fill={color} fill-opacity="0.2" />
	<rect x="3.5" y="7.5" width="11.8889" height="19" rx="1.5" stroke={color} stroke-opacity="0.8" />
	<rect
		x="7.51108"
		y="23.9697"
		width="3.86667"
		height="0.606061"
		rx="0.30303"
		fill={color}
		fill-opacity="0.8"
	/>
	<rect x="9.88892" width="12.8889" height="20" rx="2" fill={color} fill-opacity="0.2" />
	<rect
		x="10.3889"
		y="0.5"
		width="11.8889"
		height="19"
		rx="1.5"
		stroke={color}
		stroke-opacity="0.8"
	/>
	<rect
		x="14.4"
		y="16.9697"
		width="3.86667"
		height="0.606061"
		rx="0.30303"
		fill={color}
		fill-opacity="0.8"
	/>
	<rect
		y="2"
		width="1.41421"
		height="33.941"
		rx="0.707104"
		transform="rotate(-45 0 2)"
		fill={color}
		fill-opacity={random[0]}
	/>
	<rect
		x="23.9999"
		y="1"
		width="1.41421"
		height="33.941"
		rx="0.707104"
		transform="rotate(45 23.9999 1)"
		fill={color}
		fill-opacity={random[1]}
	/>
</svg>

<style>
	rect {
		transition: all linear 0.3s;
	}
</style>
