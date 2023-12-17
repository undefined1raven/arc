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
	viewBox="0 0 42 15"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="22.0586" y="14.1177" width="19.4118" height="0.882353" rx="0.441176" fill={color} />
	<rect x="22.0586" y="12.3528" width="15.8824" height="0.882353" rx="0.441176" fill={color} />
	<rect x="22.0586" y="10.5881" width="10.5882" height="0.882353" rx="0.441176" fill={color} />
	<rect x="22.0586" y="8.82373" width="7.94118" height="0.882353" rx="0.441176" fill={color} />
	<rect
		width="19.4118"
		height="0.882353"
		rx="0.441176"
		transform="matrix(-1 0 0 1 19.4116 14.1177)"
		fill={color}
	/>
	<rect
		width="15.8824"
		height="0.882353"
		rx="0.441176"
		transform="matrix(-1 0 0 1 19.4116 12.3528)"
		fill={color}
	/>
	<rect
		width="10.5882"
		height="0.882353"
		rx="0.441176"
		transform="matrix(-1 0 0 1 19.4116 10.5881)"
		fill={color}
	/>
	<rect
		width="7.94118"
		height="0.882353"
		rx="0.441176"
		transform="matrix(-1 0 0 1 19.4116 8.82373)"
		fill={color}
	/>
	<rect
		width="19.4118"
		height="0.882353"
		rx="0.441176"
		transform="matrix(1 0 0 -1 22.0586 0.882324)"
		fill={color}
	/>
	<rect
		width="15.8824"
		height="0.882353"
		rx="0.441176"
		transform="matrix(1 0 0 -1 22.0586 2.64722)"
		fill={color}
	/>
	<rect
		width="10.5882"
		height="0.882353"
		rx="0.441176"
		transform="matrix(1 0 0 -1 22.0586 4.41187)"
		fill={color}
	/>
	<rect
		width="7.94118"
		height="0.882353"
		rx="0.441176"
		transform="matrix(1 0 0 -1 22.0586 6.17651)"
		fill={color}
	/>
	<rect
		x="19.4116"
		y="0.882324"
		width="19.4118"
		height="0.882353"
		rx="0.441176"
		transform="rotate(-180 19.4116 0.882324)"
		fill={color}
	/>
	<rect
		x="19.4116"
		y="2.64722"
		width="15.8824"
		height="0.882353"
		rx="0.441176"
		transform="rotate(-180 19.4116 2.64722)"
		fill={color}
	/>
	<rect
		x="19.4116"
		y="4.41187"
		width="10.5882"
		height="0.882353"
		rx="0.441176"
		transform="rotate(-180 19.4116 4.41187)"
		fill={color}
	/>
	<rect
		x="19.4116"
		y="6.17651"
		width="7.94118"
		height="0.882353"
		rx="0.441176"
		transform="rotate(-180 19.4116 6.17651)"
		fill={color}
	/>
</svg>
