
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
<svg 	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
 viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="10" fill={color} fill-opacity="0.2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C10 14.4772 14.4772 10 20 10Z" fill="url(#paint0_linear_206_142)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10C14.4772 10 10 5.52285 10 0Z" fill="url(#paint1_linear_206_142)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C5.52285 10 10 14.4772 10 20C4.47715 20 0 15.5228 0 10Z" fill="url(#paint2_linear_206_142)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C10 5.52285 5.52285 10 0 10C0 4.47715 4.47715 0 10 0Z" fill="url(#paint3_linear_206_142)"/>
<defs>
<linearGradient id="paint0_linear_206_142" x1="15" y1="10" x2="15" y2="20" gradientUnits="userSpaceOnUse">
<stop stop-color={color}/>
<stop offset="1" stop-color={color} stop-opacity="0.2"/>
</linearGradient>
<linearGradient id="paint1_linear_206_142" x1="15" y1="0" x2="15" y2="10" gradientUnits="userSpaceOnUse">
<stop stop-color={color}/>
<stop offset="1" stop-color={color} stop-opacity="0.2"/>
</linearGradient>
<linearGradient id="paint2_linear_206_142" x1="5" y1="10" x2="5" y2="20" gradientUnits="userSpaceOnUse">
<stop stop-color={color}/>
<stop offset="1" stop-color={color} stop-opacity="0.2"/>
</linearGradient>
<linearGradient id="paint3_linear_206_142" x1="5" y1="0" x2="5" y2="10" gradientUnits="userSpaceOnUse">
<stop stop-color={color}/>
<stop offset="1" stop-color={color} stop-opacity="0.2"/>
</linearGradient>
</defs>
</svg>
