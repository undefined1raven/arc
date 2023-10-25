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
	viewBox="0 0 23 7"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect y="1.75" width="17.5" height="1.75" fill={color} />
	<path
		d="M17.5 1C17.5 0.447715 17.9477 0 18.5 0H21.75C22.3023 0 22.75 0.447715 22.75 1V4.25C22.75 4.80228 22.3023 5.25 21.75 5.25H18.5C17.9477 5.25 17.5 4.80228 17.5 4.25V1Z"
		fill={color}
	/>
	<path
		d="M0 3.5H1.75V6.125C1.75 6.60825 1.35825 7 0.875 7C0.391751 7 0 6.60825 0 6.125V3.5Z"
		fill={color}
	/>
	<path
		d="M3.5 3.5H5.25V6.125C5.25 6.60825 4.85825 7 4.375 7C3.89175 7 3.5 6.60825 3.5 6.125V3.5Z"
		fill={color}
	/>
</svg>
