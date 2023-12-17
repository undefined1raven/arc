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
			for (let ix = 0; ix < 4; ix++) {
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
	viewBox="0 0 37 36"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M17.5621 7.5345C17.8843 6.66389 19.1157 6.66389 19.4379 7.5345L21.7166 13.6926C21.8178 13.9663 22.0337 14.1822 22.3074 14.2834L28.4655 16.5621C29.3361 16.8843 29.3361 18.1157 28.4655 18.4379L22.3074 20.7166C22.0337 20.8178 21.8178 21.0337 21.7166 21.3074L19.4379 27.4655C19.1157 28.3361 17.8843 28.3361 17.5621 27.4655L15.2834 21.3074C15.1822 21.0337 14.9663 20.8178 14.6926 20.7166L8.5345 18.4379C7.66389 18.1157 7.66389 16.8843 8.5345 16.5621L14.6926 14.2834C14.9663 14.1822 15.1822 13.9663 15.2834 13.6926L17.5621 7.5345Z"
		fill={color}
		fill-opacity={random[0]}
	/>
	<path
		d="M10.9678 11.6165C10.58 10.7731 11.4507 9.90235 12.2942 10.2902L18.2599 13.0333C18.5251 13.1553 18.8303 13.1553 19.0954 13.0333L25.0612 10.2902C25.9046 9.90235 26.7753 10.7731 26.3875 11.6165L23.6443 17.5822C23.5224 17.8474 23.5224 18.1526 23.6443 18.4178L26.3875 24.3835C26.7753 25.2269 25.9046 26.0977 25.0612 25.7098L19.0954 22.9667C18.8303 22.8447 18.5251 22.8447 18.2599 22.9667L12.2942 25.7098C11.4507 26.0977 10.58 25.2269 10.9678 24.3835L13.711 18.4178C13.8329 18.1526 13.8329 17.8474 13.711 17.5822L10.9678 11.6165Z"
		fill={color}
		fill-opacity={random[1]}
	/>
	<rect x="3.1" y="3.1" width="29.8" height="29.8" rx="2.9" stroke={color} stroke-width="0.2" />
	<rect
		x="0.1"
		y="0.1"
		width="35.8"
		height="35.8"
		rx="2.4"
		stroke={color}
		stroke-opacity={random[3]}
		stroke-width="0.2"
	/>
	<rect x="13" y="1.5" width="11" height="0.3" rx="0.15" fill={color} />
</svg>
<style>
	path,
	rect,
	circle {
		transition: all linear 0.4s;
	}
</style>
