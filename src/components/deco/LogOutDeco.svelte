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
	let opacity = 1;
	let color = lglobalStyles.activeColor;

	export { opacity, height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; opacity: {opacity}; {style}"
	viewBox="0 0 13 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="13" height="1" rx="0.5" fill={color} />
	<rect y="15" width="13" height="1" rx="0.5" fill={color} />
	<rect
		x="2"
		y="12.1924"
		width="13"
		height="1"
		rx="0.5"
		transform="rotate(-45 2 12.1924)"
		fill={color}
	/>
</svg>
