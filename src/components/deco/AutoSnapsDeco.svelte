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
	viewBox="0 0 60 40"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g opacity="0.5">
		<rect x="45.6129" y="16.7742" width="3.87097" height="6.45161" rx="1" fill={color} />
		<rect
			x="47.2258"
			y="0.322581"
			width="0.645161"
			height="39.3548"
			stroke={color}
			stroke-width="0.645161"
			stroke-dasharray="2 2"
		/>
		<rect
			x="36.1412"
			y="21.073"
			width="1.97211"
			height="23.6653"
			rx="0.986056"
			transform="rotate(-90 36.1412 21.073)"
			fill={color}
		/>
		<rect
			x="35.5633"
			y="21.2703"
			width="1.97211"
			height="9.86056"
			rx="0.986056"
			transform="rotate(-135 35.5633 21.2703)"
			fill={color}
		/>
		<rect
			x="34.0001"
			y="20.0452"
			width="1.97211"
			height="10.0997"
			rx="0.986056"
			transform="rotate(-45 34.0001 20.0452)"
			fill={color}
		/>
	</g>
	<g opacity="0.5">
		<rect x="28.6129" y="16.7742" width="3.87097" height="6.45161" rx="1" fill={color} />
		<rect
			x="30.2258"
			y="0.322581"
			width="0.645161"
			height="39.3548"
			stroke={color}
			stroke-width="0.645161"
			stroke-dasharray="2 2"
		/>
		<rect
			x="19.1412"
			y="21.073"
			width="1.97211"
			height="23.6653"
			rx="0.986056"
			transform="rotate(-90 19.1412 21.073)"
			fill={color}
		/>
		<rect
			x="18.5633"
			y="21.2703"
			width="1.97211"
			height="9.86056"
			rx="0.986056"
			transform="rotate(-135 18.5633 21.2703)"
			fill={color}
		/>
		<rect
			x="17.0001"
			y="20.0452"
			width="1.97211"
			height="10.0997"
			rx="0.986056"
			transform="rotate(-45 17.0001 20.0452)"
			fill={color}
		/>
	</g>
	<g opacity="0.5">
		<rect x="11.6129" y="16.7742" width="3.87097" height="6.45161" rx="1" fill={color} />
		<rect
			x="13.2258"
			y="0.322581"
			width="0.645161"
			height="39.3548"
			stroke={color}
			stroke-width="0.645161"
			stroke-dasharray="2 2"
		/>
		<rect
			x="2.14115"
			y="21.073"
			width="1.97211"
			height="23.6653"
			rx="0.986056"
			transform="rotate(-90 2.14115 21.073)"
			fill={color}
		/>
		<rect
			x="1.56332"
			y="21.2703"
			width="1.97211"
			height="9.86056"
			rx="0.986056"
			transform="rotate(-135 1.56332 21.2703)"
			fill={color}
		/>
		<rect
			x="0.000114441"
			y="20.0452"
			width="1.97211"
			height="10.0997"
			rx="0.986056"
			transform="rotate(-45 0.000114441 20.0452)"
			fill={color}
		/>
	</g>
</svg>
