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
	class="trashDeco"
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 18 19"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M3 4C3 3.44772 3.44772 3 4 3V3C4.55228 3 5 3.44772 5 4V19H3V4Z" fill={color} />
	<path d="M8 4C8 3.44772 8.44772 3 9 3V3C9.55228 3 10 3.44772 10 4V19H8V4Z" fill={color} />
	<path d="M13 4C13 3.44772 13.4477 3 14 3V3C14.5523 3 15 3.44772 15 4V19H13V4Z" fill={color} />
	<rect width="18" height="2" rx="1" fill={color} />
</svg>
