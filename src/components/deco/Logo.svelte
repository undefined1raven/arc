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
	viewBox="0 0 151 50"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M20.9851 3.4795L21.8914 3.90212L1.43723 47.7663L0.692968 48.1622L0.0131247 48.4884L20.9851 3.4795Z"
		fill={color}
	/>
	<path
		d="M20.7302 4.1037L21 3.49999L22 3.49999L22 3.99999L42.3611 48.125L42.8834 49.3192L42.1884 48.9438L41.4548 48.5476L20.7302 4.1037Z"
		fill={color}
	/>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M20.505 4.51042L20.6442 4.21153L21 3.5L22 3.49999V3.6693L21.0619 5.68108L20.505 4.51042Z"
		fill={color}
	/>
	<rect x="58" width="1" height="49.0385" fill={color} />
	<rect x="58" y="1" width="1" height="31.7308" transform="rotate(-90 58 1)" fill={color} />
	<path
		d="M143.356 7.18151C139.927 3.75244 135.558 1.41721 130.802 0.471129C126.046 -0.47495 121.116 0.0106135 116.636 1.86642C112.155 3.72222 108.326 6.86491 105.632 10.8971C102.938 14.9292 101.5 19.6698 101.5 24.5192C101.5 29.3687 102.938 34.1092 105.632 38.1414C108.326 42.1736 112.155 45.3162 116.636 47.172C121.116 49.0278 126.046 49.5134 130.802 48.5673C135.558 47.6212 139.927 45.286 143.356 41.8569L142.539 41.0391C139.271 44.3065 135.109 46.5316 130.577 47.433C126.045 48.3345 121.347 47.8718 117.078 46.1035C112.809 44.3353 109.16 41.3408 106.593 37.4989C104.026 33.6569 102.656 29.1399 102.656 24.5192C102.656 19.8985 104.026 15.3816 106.593 11.5396C109.16 7.69764 112.809 4.70318 117.078 2.93491C121.347 1.16665 126.045 0.703987 130.577 1.60544C135.108 2.5069 139.271 4.73198 142.539 7.99931L143.356 7.18151Z"
		fill={color}
	/>
</svg>
