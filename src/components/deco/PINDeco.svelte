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
	let digits = 0;

	export { height, width, left, top, style, color, digits };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 108 200"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M0 53.3334L26.6667 7.1454H80L106.667 53.3334L80 99.5214H26.6667L0 53.3334Z"
		fill={color}
		fill-opacity={digits > 0 ? 0.4 : 0.1}
	/>
	<path
		d="M0 71.9999L26.6667 25.8119H80L106.667 71.9999L80 118.188H26.6667L0 71.9999Z"
		fill={color}
		fill-opacity={digits > 1 ? 0.4 : 0.1}
	/>
	<path
		d="M0 90.6667L26.6667 44.4787H80L106.667 90.6667L80 136.855H26.6667L0 90.6667Z"
		fill={color}
		fill-opacity={digits > 2 ? 0.4 : 0.1}
	/>
	<path
		d="M0 109.333L26.6667 63.1454H80L106.667 109.333L80 155.521H26.6667L0 109.333Z"
		fill={color}
		fill-opacity={digits > 3 ? 0.4 : 0.1}
	/>
	<path
		d="M1.33325 128L27.9999 81.8119H81.3333L108 128L81.3333 174.188H27.9999L1.33325 128Z"
		fill={color}
		fill-opacity={digits > 4 ? 0.4 : 0.1}
	/>
	<path
		d="M1.33325 146.667L27.9999 100.479H81.3333L108 146.667L81.3333 192.855H27.9999L1.33325 146.667Z"
		fill={color}
		fill-opacity={digits > 5 ? 0.4 : 0.1}
	/>
</svg>

<style>
	path {
		transition: all linear 0.3s;
	}
</style>
