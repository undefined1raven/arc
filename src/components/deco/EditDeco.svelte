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
	viewBox="0 0 19 27"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M15.9237 1.4137C16.242 0.909076 16.9091 0.758005 17.4137 1.07627C17.9183 1.39454 18.0694 2.06162 17.7511 2.56624L5.64944 21.7539L3.82205 20.6014L15.9237 1.4137Z"
		fill={color}
	/>
	<path d="M1.85779 25.746L3.22751 21.8206L4.81009 22.8187L1.85779 25.746Z" fill={color} />
</svg>
