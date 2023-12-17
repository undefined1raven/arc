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
	viewBox="0 0 142 142"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M22.9721 83.6443L35.7636 35.9057L83.5022 23.1142L118.449 58.0613L105.658 105.8L57.9192 118.591L22.9721 83.6443Z"
		stroke={color}
	/>
	<path
		d="M60.5357 73.5791L63.2621 63.4043L73.4369 60.678L80.8854 68.1264L78.159 78.3013L67.9842 81.0276L60.5357 73.5791Z"
		stroke={color}
	/>
	<rect
		x="67.322"
		y="74.2416"
		width="6.77778"
		height="6.77778"
		transform="rotate(-90 67.322 74.2416)"
		stroke-opacity={random[0]}
		stroke={color}
	/>
	<rect
		x="44.0388"
		fill-opacity={random[2]}
		y="50.2103"
		width="1.11111"
		height="41.1111"
		rx="0.555556"
		fill={color}
	/>
	<rect
		x="50.1506"
		y="45.2103"
		width="1.11111"
		fill-opacity={random[1]}
		height="41.1111"
		rx="0.555556"
		transform="rotate(-90 50.1506 45.2103)"
		fill={color}
	/>
	<rect
		x="97.5464"
		y="91.4952"
		width="1.11111"
		height="41.1111"
		rx="0.555556"
		fill-opacity={random[3]}
		transform="rotate(180 97.5464 91.4952)"
		fill={color}
	/>
	<rect
		x="91.4351"
		y="96.4952"
		width="1.11111"
		height="41.1111"
		rx="0.555556"
		transform="rotate(90 91.4351 96.4952)"
		fill-opacity={random[4]}
		fill={color}
	/>
	<rect
		x="78.5676"
		y="86.5665"
		width="11.1111"
		height="1.11111"
		transform="rotate(-45 78.5676 86.5665)"
		fill={color}
		fill-opacity={random[5]}
	/>
	<rect
		x="54.2109"
		y="62.2106"
		width="11.1111"
		height="1.11111"
		transform="rotate(-45 54.2109 62.2106)"
		fill={color}
		fill-opacity={random[6]}
	/>
	<rect
		x="86.4233"
		y="62.996"
		width="11.1111"
		height="1.11111"
		transform="rotate(-135 86.4233 62.996)"
		fill={color}
		fill-opacity={random[7]}
	/>
	<rect
		x="62.0684"
		y="87.3518"
		width="11.1111"
		height="1.11111"
		transform="rotate(-135 62.0684 87.3518)"
		fill={color}
		fill-opacity={random[8]}
	/>
</svg>

<style>
	path,
	rect {
		transition: all linear 0.3s;
	}
</style>
