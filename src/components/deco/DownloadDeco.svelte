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
				random.push(Math.max(Math.random(), 0.3));
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
	viewBox="0 0 75 75"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M37.5 63.5593L5.02405 15.8898L69.976 15.8898L37.5 63.5593Z"
		fill="url(#paint0_linear_60_140)"
		fill-opacity={random[0]}
	/>
	<path
		d="M37.5 69.189L5.02405 21.5195L69.976 21.5195L37.5 69.189Z"
		fill="url(#paint1_linear_60_140)"
		fill-opacity={random[1]}
	/>
	<path
		d="M37.5 75L5.02405 27.3305L69.976 27.3305L37.5 75Z"
		fill="url(#paint2_linear_60_140)"
		fill-opacity={random[2]}
	/>
	<defs>
		<linearGradient
			id="paint0_linear_60_140"
			x1="37.5"
			y1="16.1441"
			x2="37.5"
			y2="62.0339"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={color} />
			<stop offset="1" stop-color={color} stop-opacity="0" />
		</linearGradient>
		<linearGradient
			id="paint1_linear_60_140"
			x1="37.5"
			y1="21.7737"
			x2="37.5"
			y2="67.6635"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={color} />
			<stop offset="1" stop-color={color} stop-opacity="0" />
		</linearGradient>
		<linearGradient
			id="paint2_linear_60_140"
			x1="37.5"
			y1="27.5847"
			x2="37.5"
			y2="73.4746"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={color} />
			<stop offset="1" stop-color={color} stop-opacity="0" />
		</linearGradient>
	</defs>
</svg>

<style>
	path {
		transition: all linear 0.3s;
	}
</style>
