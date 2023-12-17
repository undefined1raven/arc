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
	let opacity = 1;
	let random = [0, 0, 0];
	let interval;
	onMount(() => {
		interval = setInterval(() => {
			random = [];
			for (let ix = 0; ix < 2; ix++) {
				random.push(Math.max(Math.random(), 0.2));
			}
		}, 400);
	});

	onDestroy(() => {
		if (interval !== undefined) {
			clearInterval(interval);
		}
	});

	export { opacity, height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; opacity: {opacity}; {style}"
	viewBox="0 0 600 600"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		y="2.13523"
		width="3.01967"
		height="845.508"
		rx="1.50984"
		transform="rotate(-45 0 2.13523)"
		fill={color}
		fill-opacity={random[0]}
	/>
	<rect
		x="597.865"
		width="3.01967"
		height="845.508"
		rx="1.50984"
		transform="rotate(45 597.865 0)"
		fill={color}
		fill-opacity={random[1]}
	/>
</svg>

<style>
	rect {
		transition: all linear 0.3s;
	}
</style>
