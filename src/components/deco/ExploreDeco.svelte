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
	viewBox="0 0 17 30"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect y="13.5" width="3" height="16.5" rx="1.5" fill={color} />
	<rect x="4.5" y="6" width="3" height="24" rx="1.5" fill={color} />
	<rect x="9" y="10.5" width="3" height="19.5" rx="1.5" fill={color} />
	<rect x="13.5" width="3" height="30" rx="1.5" fill={color} />
</svg>
