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
			for (let ix = 0; ix < 2; ix++) {
				random.push(Math.min(Math.max(Math.random(), 0.3), 0.8));
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
	viewBox="0 0 170 170"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M44.6678 50.7915C43.6716 47.0737 47.0737 43.6716 50.7916 44.6678L134.443 67.0822C138.161 68.0784 139.406 72.7257 136.685 75.4474L75.4474 136.685C72.7257 139.406 68.0784 138.161 67.0822 134.443L44.6678 50.7915Z"
		fill={color}
		fill-opacity={random[0]}
	/>
	<path
		d="M44.6678 50.7915C43.6716 47.0737 47.0737 43.6716 50.7916 44.6678L134.443 67.0822C138.161 68.0784 139.406 72.7257 136.685 75.4474L75.4474 136.685C72.7257 139.406 68.0784 138.161 67.0822 134.443L44.6678 50.7915Z"
		fill={color}
		fill-opacity="0.2"
	/>
	<path
		d="M62.1782 64.6276C61.7797 63.1405 63.1406 61.7797 64.6277 62.1782L113.703 75.3279C115.19 75.7264 115.689 77.5853 114.6 78.674L78.6741 114.6C77.5854 115.689 75.7265 115.19 75.328 113.703L62.1782 64.6276Z"
		fill={color}
		fill-opacity={random[1]}
	/>
	<path
		d="M62.1782 64.6276C61.7797 63.1405 63.1406 61.7797 64.6277 62.1782L113.703 75.3279C115.19 75.7264 115.689 77.5853 114.6 78.674L78.6741 114.6C77.5854 115.689 75.7265 115.19 75.328 113.703L62.1782 64.6276Z"
		fill={color}
		fill-opacity="0.2"
	/>
</svg>

<style>
	path {
		transition: all linear 0.3s;
	}
</style>
