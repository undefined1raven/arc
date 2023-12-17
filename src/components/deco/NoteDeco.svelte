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
	viewBox="0 0 29 36"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M28.1364 35.5H0.5V1.5H17.2929L22.7146 6.92174L28.1364 12.3435V35.5Z"
		fill={color}
		fill-opacity="0.2"
		stroke={color}
	/>
	<path
		d="M24.9823 0.913698C25.3006 0.409076 25.9677 0.258005 26.4723 0.576271V0.576271C26.9769 0.894536 27.128 1.56162 26.8097 2.06624L14.708 21.2539L12.8806 20.1014L24.9823 0.913698Z"
		fill={color}
	/>
	<path d="M10.9159 25.246L12.2856 21.3206L13.8682 22.3187L10.9159 25.246Z" fill={color} />
</svg>
