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
			for (let ix = 0; ix < 25; ix++) {
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
	viewBox="0 0 67 70"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle
		cx="48.3343"
		cy="19.0794"
		r="12.2196"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[0]}
		stroke={color}
	/>
	<circle
		cx="8.26778"
		cy="19.7153"
		r="2.67989"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[1]}
		stroke={color}
	/>
	<circle
		cx="26.0752"
		cy="19.7153"
		r="2.67989"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[2]}
		stroke={color}
	/>
	<circle
		cx="26.0752"
		cy="19.7153"
		r="2.67989"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[3]}
		stroke={color}
	/>
	<circle
		cx="17.1713"
		cy="19.7153"
		r="2.67989"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[4]}
		stroke={color}
	/>
	<circle
		cx="17.1713"
		cy="19.7153"
		r="2.67989"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[5]}
		stroke={color}
	/>
	<rect
		x="0.317989"
		y="19.3973"
		width="65.5058"
		height="0.635978"
		fill={color}
		fill-opacity="0.2"
		stroke={color}
		stroke-opacity={random[6]}
		stroke-width="0.635978"
	/>
	<circle
		cx="44.0864"
		cy="21.7811"
		r="12.2196"
		transform="rotate(-60 44.0864 21.7811)"
		stroke-opacity={random[7]}
		fill={color}
		fill-opacity="0.2"
		stroke={color}
	/>
	<circle
		cx="24.6038"
		cy="56.798"
		r="2.67989"
		transform="rotate(-60 24.6038 56.798)"
		fill={color}
		stroke-opacity={random[8]}
		fill-opacity="0.2"
		stroke={color}
	/>
	<circle
		cx="33.5076"
		cy="41.3764"
		r="2.67989"
		transform="rotate(-60 33.5076 41.3764)"
		fill={color}
		stroke-opacity={random[9]}
		fill-opacity="0.2"
		stroke={color}
	/>
	<circle
		cx="33.5076"
		cy="41.3764"
		r="2.67989"
		transform="rotate(-60 33.5076 41.3764)"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[10]}
		stroke={color}
	/>
	<circle
		cx="29.0557"
		cy="49.0871"
		r="2.67989"
		transform="rotate(-60 29.0557 49.0871)"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[11]}
		stroke={color}
	/>
	<circle
		cx="29.0557"
		cy="49.0871"
		r="2.67989"
		transform="rotate(-60 29.0557 49.0871)"
		fill={color}
		fill-opacity="0.2"
		stroke-opacity={random[12]}
		stroke={color}
	/>
	<rect
		x="20.3533"
		y="63.5237"
		width="65.5058"
		height="0.635978"
		transform="rotate(-60 20.3533 63.5237)"
		fill={color}
		fill-opacity="0.2"
		stroke={color}
		stroke-opacity={random[13]}
		stroke-width="0.635978"
	/>
</svg>

<style>
	path,
	rect,
	circle {
		transition: all linear 0.4s;
	}
</style>
