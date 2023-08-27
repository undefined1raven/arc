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
	viewBox="0 0 27 42"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="1.5" y="19.5" width="25" height="22" stroke={color} />
	<path d="M1 17.5L14 1L26.5 17.5" stroke={color} />
	<rect x="11.5" y="24" width="5" height="5" stroke={color} />
</svg>
