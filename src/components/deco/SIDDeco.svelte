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
			for (let ix = 0; ix < 10; ix++) {
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
	viewBox="0 0 71 71"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M1.6038 35.4484C1.26848 35.3167 1.17834 34.8842 1.43309 34.6295L35.0018 1.06079C35.197 0.865528 35.5136 0.865528 35.7089 1.06079L69.2923 34.6442C69.5451 34.897 69.4585 35.3258 69.1274 35.4607L36.1819 48.8861C36.063 48.9345 35.9299 48.9354 35.8104 48.8884L1.6038 35.4484Z"
		fill={color}
		fill-opacity="0.1"
		stroke-opacity={random[0]}
		stroke={color}
	/>
	<path
		d="M11.5552 59.2871C11.225 59.4311 10.8555 59.189 10.8555 58.8288L10.8555 11.3555C10.8555 11.0793 11.0793 10.8555 11.3555 10.8555H58.8495C59.2071 10.8555 59.4491 11.2199 59.3104 11.5495L45.5075 44.3386C45.4577 44.457 45.3642 44.5516 45.2465 44.6029L11.5552 59.2871Z"
		fill={color}
		fill-opacity="0.1"
		stroke-opacity={random[1]}
		stroke={color}
	/>
	<path
		d="M35.2625 1.6038C35.3943 1.26848 35.8267 1.17834 36.0815 1.43309L69.6501 35.0018C69.8454 35.197 69.8454 35.5136 69.6501 35.7089L36.0668 69.2923C35.8139 69.5451 35.3851 69.4585 35.2502 69.1274L21.8249 36.1819C21.7764 36.063 21.7756 35.9299 21.8225 35.8104L35.2625 1.6038Z"
		fill={color}
		fill-opacity="0.1"
		stroke-opacity={random[2]}
		stroke={color}
	/>
</svg>

<style>
	path,
	circle {
		transition: all linear 0.4s;
	}
</style>
