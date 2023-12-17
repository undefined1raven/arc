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
	viewBox="0 0 19 19"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="8.5" width="2" height="19" rx="1" fill={color} />
	<rect y="10.5" width="2" height="19" rx="1" transform="rotate(-90 0 10.5)" fill={color} />
</svg>
