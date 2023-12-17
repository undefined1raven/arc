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
	let ring = -1;
	let strokeWidth = 1;
	let crosshairStrokeWidth = 0.5;

	export { crosshairStrokeWidth, strokeWidth, height, width, left, top, style, color, ring };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 45 45"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		x="0.25"
		y="22.25"
		width="44.5"
		height="0.5"
		stroke={color}
		stroke-opacity="0.1"
		stroke-width={crosshairStrokeWidth}
		stroke-dasharray="2 2"
	/>
	<rect
		x="22.25"
		y="44.75"
		width="44.5"
		height="0.5"
		transform="rotate(-90 22.25 44.75)"
		stroke={color}
		stroke-opacity="0.1"
		stroke-width={crosshairStrokeWidth}
		stroke-dasharray="2 2"
	/>
	<circle
		cx="22.5"
		cy="22.5"
		r="4.85714"
		stroke={color}
		stroke-width={strokeWidth}
		stroke-opacity={ring === 0 ? 1 : 0.2}
	/>
	<circle
		stroke-width={strokeWidth}
		cx="22.5"
		cy="22.5"
		r="9.14286"
		stroke={color}
		stroke-opacity={ring === 1 ? 1 : 0.2}
	/>
	<circle
		cx="22.5001"
		cy="22.5001"
		r="13.4286"
		stroke-width={strokeWidth}
		stroke={color}
		stroke-opacity={ring === 2 ? 1 : 0.2}
	/>
	<circle
		cx="22.4999"
		cy="22.4999"
		stroke-width={strokeWidth}
		r="17.7143"
		stroke={color}
		stroke-opacity={ring === 3 ? 1 : 0.2}
	/>
	<circle
		cx="22.5"
		stroke-width={strokeWidth}
		cy="22.5"
		r="22"
		stroke={color}
		stroke-opacity={ring === 4 ? 1 : 0.2}
	/>
</svg>

<style>
	circle {
		transition: all linear 0.2s;
	}
</style>
