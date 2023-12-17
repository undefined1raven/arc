<script>
	import globalStyle from '../../stores/globalStyles';

	let lglobalStyles = $globalStyle;
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let color = lglobalStyles.activeColor;
	let id;
	export { height, width, left, top, style, color, id };
</script>

<svg
	id={id ? id : undefined}
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 27 50"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		x="24.9922"
		y="50"
		width="35.1565"
		height="1.46795"
		rx="0.733977"
		transform="rotate(-135 24.9922 50)"
		fill={color}
	/>
	<rect
		x="25.8984"
		y="1.03784"
		width="35.1565"
		height="1.46795"
		rx="0.733977"
		transform="rotate(135 25.8984 1.03784)"
		fill={color}
	/>
</svg>
