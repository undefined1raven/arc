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
	let strokeWidth = 3;
	let strokeDashOffset = 0;
	let strokeDasharray = 10000;
	export {
		strokeWidth,
		height,
		width,
		left,
		top,
		style,
		color,
		id,
		strokeDashOffset,
		strokeDasharray
	};
</script>

<svg
	id={id ? id : undefined}
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 75 75"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle
		cx="37.5"
		cy="37.5"
		r="36"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-dasharray={strokeDasharray}
		stroke-dashoffset={strokeDashOffset}
	/>
</svg>

<style>
	circle {
		transition: all ease-out 0.5s;
	}
</style>
