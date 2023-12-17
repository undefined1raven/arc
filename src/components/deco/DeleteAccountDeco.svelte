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
				random.push(Math.max(Math.random(), 0.7));
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
	viewBox="0 0 25 31"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		x="3.30762"
		y="7.01465"
		width="1"
		height="25"
		rx="0.5"
		transform="rotate(-45 3.30762 7.01465)"
		fill={color}
		fill-opacity={random[0]}
	/>
	<rect
		x="20.9853"
		y="6.30762"
		width="1"
		height="25"
		rx="0.5"
		transform="rotate(45 20.9853 6.30762)"
		fill={color}
		fill-opacity={random[1]}
	/>
	<rect
		y="6.96143"
		width="1.35982"
		height="33.9954"
		rx="0.679908"
		transform="rotate(-45 0 6.96143)"
		fill={color}
		fill-opacity={random[2]}
	/>
	<rect
		x="24.0384"
		y="6"
		width="1.35982"
		height="33.9954"
		rx="0.679908"
		transform="rotate(45 24.0384 6)"
		fill={color}
		fill-opacity={random[3]}
	/>
	<rect
		y="0.961426"
		width="1.35982"
		height="33.9954"
		rx="0.679908"
		transform="rotate(-45 0 0.961426)"
		fill={color}
		fill-opacity={random[4]}
	/>
	<rect
		x="24.0384"
		width="1.35982"
		height="33.9954"
		rx="0.679908"
		transform="rotate(45 24.0384 0)"
		fill={color}
		fill-opacity={random[5]}
	/>
</svg>

<style>
	rect {
		transition: all linear 0.3s;
	}
</style>
