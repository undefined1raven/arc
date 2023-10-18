<script>
	import Label from './Label.svelte';
	import globalStyle from '../../stores/globalStyles';
	import mousePosition from '../../stores/mousePosition';
	let lmousePosition = $mousePosition;
	mousePosition.subscribe((mp) => {
		lmousePosition = mp;
	});
	let lglobalStyle = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyle = gs;
	});
	let text = '';
	let show = false;
	export { text, show };
</script>

<Label
	{show}
	{text}
	top="{lmousePosition.y}px"
	left="{lmousePosition.x}px"
	style="padding: 0.5%; z-index: 300; padding-left: 0.8%;"
	backgroundColor="#000000AA"
	borderRadius={lglobalStyle.borderRadius}
	backdropFilter="blur(5px)"
	color={"#FFF"}
	desktopFont={lglobalStyle.smallDesktopFont}
/>
