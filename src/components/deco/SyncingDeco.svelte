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

	let opacityArray = new Array(10).fill(0.1);

	let aniInterval = setInterval(() => {
		for (let ix = 0; ix < opacityArray.length; ix++) {
			opacityArray[ix] = Math.random().toFixed(3);
		}
	}, 300);

	onDestroy(() => {
		clearInterval(aniInterval);
	});

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 30 30"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M2.05962 7.52887L15 0.0577348L27.9404 7.52887V22.4711L15 29.9423L2.05962 22.4711V7.52887Z"
		fill={color}
		fill-opacity={0.1}
		stroke={color}
		stroke-width="0.1"
	/>
	<path
		d="M10.7199 12.5289L15 10.0577L19.2801 12.5289V17.4711L15 19.9423L10.7199 17.4711V12.5289Z"
		fill={color}
		fill-opacity={opacityArray[1]}
		stroke={color}
		stroke-width="0.1"
	/>
	<rect
		x="2.19922"
		y="15"
		width="0.2"
		height="25.6"
		transform="rotate(-90 2.19922 15)"
		fill={color}
		fill-opacity={opacityArray[2]}
	/>
	<path d="M14.918 0.0996094H15.1V29.8996H14.918V0.0996094Z" fill={color} />
	<rect
		x="10.7402"
		y="22.668"
		width="0.2"
		height="8.58652"
		transform="rotate(-90 10.7402 22.668)"
		fill={color}
		fill-opacity={opacityArray[3]}
	/>
	<rect
		x="23.4004"
		y="10.4004"
		width="0.2"
		height="8.58652"
		fill-opacity={opacityArray[4]}
		fill={color}
	/>
	<rect
		x="6.40039"
		y="10.8008"
		width="0.2"
		height="8.58652"
		fill-opacity={opacityArray[5]}
		fill={color}
	/>
	<rect
		x="10.8008"
		y="7.59961"
		width="0.2"
		height="8.58652"
		transform="rotate(-90 10.8008 7.59961)"
		fill-opacity={opacityArray[6]}
		fill={color}
	/>
</svg>

<style>
	rect,
	path {
		transition: all linear 0.4s;
	}
</style>
