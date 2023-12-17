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
	viewBox="0 0 28 28"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		width="12.8825"
		height="0.715557"
		rx="0.357778"
		transform="matrix(0.808773 0.58812 -0.808773 0.58812 9.36182 6)"
		fill={color}
	/>
	<rect
		width="12.6287"
		height="0.765666"
		rx="0.382833"
		transform="matrix(0.808773 -0.58812 0.808773 0.58812 8.94824 20.5497)"
		fill={color}
	/>
	<rect x="14.5557" y="20.4445" width="4.99999" height="0.555555" rx="0.277777" fill={color} />
	<path
		d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM1.35453 14C1.35453 20.9839 7.0161 26.6455 14 26.6455C20.9839 26.6455 26.6455 20.9839 26.6455 14C26.6455 7.0161 20.9839 1.35453 14 1.35453C7.0161 1.35453 1.35453 7.0161 1.35453 14Z"
		fill={color}
	/>
</svg>
