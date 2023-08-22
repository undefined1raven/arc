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
	let picSrc;
	let patternId;

	export { height, width, left, top, style, color, picSrc, patternId };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 60 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<pattern id={patternId} patternUnits="userSpaceOnUse" width="285" height="230">
			<image href={picSrc} x="0" y="0" width="700" height="230" />
		</pattern>
	</defs>
	<circle fill="url(#{patternId})" cx="30" cy="30" r="30" />
</svg>
