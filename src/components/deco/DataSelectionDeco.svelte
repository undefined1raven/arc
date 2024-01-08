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
	viewBox="0 0 47 25"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="6" height="4" rx="2" fill={color} />
	<rect x="8" width="39" height="4" rx="2" fill={color} />
	<rect y="7" width="6" height="4" rx="2" fill={color} />
	<rect x="8" y="7" width="39" height="4" rx="2" fill={color} />
	<rect y="14" width="6" height="4" rx="2" fill={color} />
	<rect x="8" y="14" width="39" height="4" rx="2" fill={color} />
	<rect y="21" width="6" height="4" rx="2" fill={color} />
	<rect x="8" y="21" width="39" height="4" rx="2" fill={color} />
</svg>
