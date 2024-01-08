<script>
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
	let strokeWidth = 2;
	export { height, width, left, top, style, color, strokeWidth };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 360 506"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		x="-0.25"
		y="0.25"
		width="0.5"
		height="505.5"
		rx="0.25"
		transform="matrix(-1 0 0 1 180.5 0)"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-dasharray="2 2"
	/>
	<rect
		x="-72.75"
		y="253.75"
		width="0.5"
		height="505.5"
		rx="0.25"
		transform="rotate(-90 -72.75 253.75)"
		stroke={color}
		stroke-width="strokeWidth"
		stroke-dasharray="2 2"
	/>
</svg>
