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

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 18 22"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M17.5 21.5H0.5V0.5H10.7929L14.1464 3.85355L17.5 7.20711V21.5Z"
		fill={color}
		fill-opacity="0.2"
		stroke={color}
	/>
</svg>
