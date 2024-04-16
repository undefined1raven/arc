<script>
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
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
	viewBox="0 0 14 14"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="7" cy="7" r="7" fill={color} fill-opacity="0.5" />
	<circle cx="7" cy="7" r="3" fill={color} fill-opacity="0.5" />
</svg>
