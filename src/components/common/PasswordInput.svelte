<script>
	import { onMount } from 'svelte';
	import isMobile from '../../fn/isMobile';
	import { RangeScaler } from '../../fn/RangeScaler.js';
	import screenSize from '../../stores/screenSize.js';
	import GlobalStyles from '../../config/GlobalStyles.js';
	import FigmaImporter from '../../fn/figmaImporter.js';
	import getFigmaImportConfig from '../../config/FigmaImportConfig.js';
	import { createEventDispatcher } from 'svelte';
	import globalStyle from '../../stores/globalStyles';
	const dispatch = createEventDispatcher();
	let lglobalStyles = $globalStyle;

	let id;
	let isMouseHovering = false;
	let className;
	let color = lglobalStyles.activeMono;
	let style;
	let borderColor;
	let backgroundColor = lglobalStyles.activeColor;
	let onClick;
	let onTouchStart;
	let onTouchEnd;
	let width;
	let height;
	let top;
	let tabletTop;
	let tabletLeft;
	let hoverOpacityMin = 20;
	let hoverOpacityMax = 40;
	let left;
	let horizontalFont;
	let verticalFont = lglobalStyles.regularMobileFont;
	let opacity;
	let backdropFilter;
	let borderRadius = lglobalStyles.borderRadius;
	let defaultValue = '';
	let inputType = 'text';
	let show = true;
	let tabletWidth;
	let desktopFont = lglobalStyles.regularDesktopFont;
	let horizontalCenter = false;
	let verticalCenter = false;
	let fontType = 'rigid';
	let figmaImportConfig = { ...getFigmaImportConfig() };
	let value = defaultValue;
	let figmaImport = {};
	let autofocus = false;
	let readonly = false;

	function onValueChange(value) {
		dispatch('onValue', value);
	}

	$: onValueChange(value);

	const root = document.documentElement;
	let fontSize = '2.4vh';
	let clientWidth = root.clientWidth;
	let clientHeight = root.clientHeight;

	onMount(() => {
		fontController();
	});

	function onResize() {
		clientHeight = root.clientHeight;
		clientWidth = root.clientWidth;
		fontController();
		screenSize.update(() => {
			return { width: clientWidth, height: clientHeight, minimized: clientWidth < 1000 };
		});
	}

	function iu(val, valDefault) {
		return val != undefined ? val : valDefault;
	} //shorthand for isUndefined. short name for readibility

	function positionParser(mobilePosition, tabletPosition) {
		if (clientWidth > 1023 && tabletPosition != 'auto') {
			return tabletPosition;
		} else {
			return mobilePosition;
		}
	}

	function fontController() {
		if (isMobile() == true) {
			let orientation = clientHeight > clientWidth ? 'portrait' : 'landscape';
			if (orientation == 'portrait') {
				if (verticalFont != undefined) {
					fontSize =
						(parseFloat(verticalFont.substring(0, verticalFont.length - 2)) * clientWidth) / 360 +
						'px';
				} else {
					fontSize = '1.4vh';
				}
			} else {
				if (horizontalFont != undefined) {
					fontSize =
						(parseFloat(horizontalFont.substring(0, horizontalFont.length - 2)) * clientWidth) /
							640 +
						'px';
				} else {
					fontSize = '2.8vh';
				}
			}
		} else {
			let rawFontSize;
			if (desktopFont != undefined) {
				rawFontSize =
					(parseFloat(desktopFont.substring(0, desktopFont.length - 2)) * clientHeight) / 1080;
				fontSize = rawFontSize + 'px';
			} else {
				fontSize = '18px';
			}
			if (clientWidth < 700 && rawFontSize && !isMobile()) {
				fontSize = parseFloat(rawFontSize - RangeScaler(rawFontSize, 10, 48, 0, 18)) + 'px';
			}
		}
	}

	export {
		id,
		readonly,
		onClick,
		defaultValue,
		inputType,
		className,
		color,
		borderColor,
		backgroundColor,
		width,
		height,
		top,
		left,
		horizontalFont,
		verticalFont,
		opacity,
		style,
		tabletLeft,
		tabletTop,
		backdropFilter,
		borderRadius,
		onTouchStart,
		onTouchEnd,
		show,
		tabletWidth,
		desktopFont,
		fontType,
		horizontalCenter,
		verticalCenter,
		figmaImportConfig,
		figmaImport,
		hoverOpacityMin,
		hoverOpacityMax,
		autofocus,
		value
	};
</script>

<svelte:window on:resize={onResize} />
{#if show}
	<input
		{readonly}
		autofocus={isMobile() ? false : autofocus}
		type="password"
		{id}
		on:touchstart={onTouchStart}
		on:touchend={onTouchEnd}
		on:click={onClick}
		on:mouseenter={() => (isMouseHovering = true)}
		on:mouseleave={() => (isMouseHovering = false)}
		class={`input ${className ? className : ''}`}
		style="
    opacity: {iu(opacity, '1')}; 
	font-family: {fontType == 'soft' ? "'Oxanium', sans-serif;" : "'Oxanium', sans-serif;"}
    font-size: {iu(fontSize, '2vh')}; 
    left: {positionParser(iu(left, 'auto'), iu(tabletLeft, 'auto'))}; 
    top: {positionParser(iu(top, 'auto'), iu(tabletTop, 'auto'))}; 
    width: {positionParser(iu(width, 'auto'), iu(tabletWidth, 'auto'))}; 
    height: {iu(height, 'auto')}; 
    color: {iu(color, '#FFF')}; 
	{Object.keys(figmaImport).length > 0 ? FigmaImporter(figmaImport, figmaImportConfig) : ''} 
    background-color: {iu(backgroundColor, '#0500FF')}{isMouseHovering
			? hoverOpacityMax
			: hoverOpacityMin}; 
	border: solid 1px {iu(borderColor, '#FFFFFF00')};
	{horizontalCenter || verticalCenter
			? `transform: translateX(${horizontalCenter == true ? '-50%' : '0px'}) translateY(${
					verticalCenter == true ? '-50%' : '0px'
			  });`
			: ''};
    border-radius: {((parseFloat(
			iu(borderRadius, '0px').substring(0, iu(borderRadius, '0px').length - 2)
		) *
			100) /
			360 /
			100) *
			clientHeight +
			'px;'}
    backdrop-filter: {iu(backdropFilter, 'blur(0px)')};
    --webkit-backdrop-filter: {iu(backdropFilter, 'blur(0px)')};
    {iu(style, '')}"
		bind:value
	/>
{/if}

<style>
	.input {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: start;
		text-align: start;
		outline: none;
		transition: all linear 0.1s;
	}
</style>
