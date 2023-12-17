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
	viewBox="0 0 41 83"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g id="Group 753">
		<g id="t">
			<path
				id="Polygon 139"
				d="M20.5 77.6611L5.34455 55.4154H35.6554L20.5 77.6611Z"
				fill="url(#paint0_linear_70_2)"
				fill-opacity={random[0]}
			/>
			<path
				id="Polygon 140"
				d="M20.5 80.2881L5.34455 58.0423H35.6554L20.5 80.2881Z"
				fill="url(#paint1_linear_70_2)"
				fill-opacity={random[1]}
			/>
			<path
				id="Polygon 142"
				d="M20.5 83L5.34455 60.7542H35.6554L20.5 83Z"
				fill="url(#paint2_linear_70_2)"
				fill-opacity={random[2]}
			/>
		</g>
		<g id="Group 738">
			<path
				id="Rectangle 3125"
				d="M0.5 0.5H24.7929L32.601 8.3081L40.4091 16.1162V49.5H0.5V0.5Z"
				fill={color}
				fill-opacity="0.2"
				stroke={color}
			/>
			<g id="Group 703">
				<rect
					id="Rectangle 3096"
					x="18.2143"
					y="41.0715"
					width="25"
					height="2.5"
					transform="rotate(-90 18.2143 41.0715)"
					fill={color}
				/>
				<path
					id="Rectangle 3097"
					d="M16.7143 16.0715C16.162 16.0715 15.7143 15.6238 15.7143 15.0715V9.57153C15.7143 9.01925 16.162 8.57153 16.7143 8.57153H22.2143C22.7666 8.57153 23.2143 9.01925 23.2143 9.57153V15.0715C23.2143 15.6238 22.7666 16.0715 22.2143 16.0715H16.7143Z"
					fill={color}
				/>
				<path
					id="Rectangle 3098"
					d="M20.7143 41.0715V38.5715H24.7143C25.2666 38.5715 25.7143 39.0192 25.7143 39.5715V40.0715C25.7143 40.6238 25.2666 41.0715 24.7143 41.0715H20.7143Z"
					fill={color}
				/>
				<path
					id="Rectangle 3099"
					d="M20.7143 36.0715V33.5715H24.7143C25.2666 33.5715 25.7143 34.0192 25.7143 34.5715V35.0715C25.7143 35.6238 25.2666 36.0715 24.7143 36.0715H20.7143Z"
					fill={color}
				/>
			</g>
		</g>
	</g>
	<defs>
		<linearGradient
			id="paint0_linear_70_2"
			x1="20.5"
			y1="55.534"
			x2="20.5"
			y2="76.9493"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={color} />
			<stop offset="1" stop-color={color} stop-opacity="0" />
		</linearGradient>
		<linearGradient
			id="paint1_linear_70_2"
			x1="20.5"
			y1="58.161"
			x2="20.5"
			y2="79.5762"
			gradientUnits="userSpaceOnUse"
		>
			<stop stop-color={color} />
			<stop offset="1" stop-color={color} stop-opacity="0" />
		</linearGradient>
		<linearGradient
			id="paint2_linear_70_2"
			x1="20.5"
			y1="60.8729"
			x2="20.5"
			y2="82.2881"
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
