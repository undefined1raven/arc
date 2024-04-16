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
	viewBox="0 0 28 25"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M15.231 2.87543L23.6591 15.9367C24.3031 16.9349 23.5866 18.25 22.3987 18.25H5.54249C4.35458 18.25 3.63803 16.9348 4.28211 15.9367L12.7102 2.87543C13.301 1.95982 14.6401 1.95982 15.231 2.87543Z"
		stroke={color}
	/>
	<path d="M7 12H21.5L22 13H6L7 12Z" fill={color} />
	<path d="M11.375 5H16.8125L17 6H11L11.375 5Z" fill={color} />
</svg>