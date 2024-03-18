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

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 23 36"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		x="9.75"
		y="26.75"
		width="17.5"
		height="1.75"
		transform="rotate(-90 9.75 26.75)"
		fill={color}
	/>
	<path
		d="M9 9.25C8.44772 9.25 8 8.80228 8 8.25V5C8 4.44772 8.44772 4 9 4H12.25C12.8023 4 13.25 4.44772 13.25 5V8.25C13.25 8.80228 12.8023 9.25 12.25 9.25H9Z"
		fill={color}
	/>
	<path
		d="M11.5 26.75V25H14.125C14.6082 25 15 25.3918 15 25.875V25.875C15 26.3582 14.6082 26.75 14.125 26.75H11.5Z"
		fill={color}
	/>
	<path
		d="M11.5 23.25V21.5H14.125C14.6082 21.5 15 21.8918 15 22.375V22.375C15 22.8582 14.6082 23.25 14.125 23.25H11.5Z"
		fill={color}
	/>
	<rect x="0.5" y="0.5" width="22" height="35" rx="2.5" stroke={color} />
	<rect x="6" y="31" width="11" height="1" rx="0.5" fill={color} />
</svg>

<style>
	path,
	circle {
		transition: all linear 0.4s;
	}
</style>
