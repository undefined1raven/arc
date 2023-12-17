<script>
	import getFigmaImportConfig from '../../config/FigmaImportConfig';
	import figmaImporter from '../../fn/figmaImporter';
	import { fly, fade, scale } from 'svelte/transition';
	import screenSize from '../../stores/screenSize';
	import globalStyle from '../../stores/globalStyles';
	import toolTipState from '../../stores/toolTipState';
	import readTransitions from '../../fn/readTransitions';
	import { onMount } from 'svelte';
	let lglobalStyle = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyle = gs;
	});
	let rendered = false;
	onMount(() => {
		rendered = true;
	});
	let figmaImport = {};
	let figmaImportConfig = { ...getFigmaImportConfig() };
	let style = '';
	let width = '';
	let height = '';
	let left = '';
	let top = '';
	let horizontalCenter = false;
	let verticalCenter = false;
	let id;
	let backgroundColor = '#FFFFFF00';
	let flyProps = { duration: 50, x: 0, y: 0 };
	let className;
	let onClick;
	let mouseLeave;
	let mouseEnter;
	let marginTop;
	let marginBottom;
	let borderRadius = lglobalStyle.borderRadius;
	let lscreenSize = $screenSize;
	let toolTipText = '';
	let transitions = {};
	screenSize.subscribe((ss) => {
		lscreenSize = ss;
	});

	function iu(val, defaultValue) {
		if (val === undefined) {
			return defaultValue;
		} else {
			return val;
		}
	}

	const { inFunc, inOptions, outFunc, outOptions } = readTransitions(transitions);

	export {
		id,
		className,
		onClick,
		style,
		figmaImport,
		figmaImportConfig,
		verticalCenter,
		horizontalCenter,
		flyProps,
		width,
		height,
		marginTop,
		marginBottom,
		top,
		left,
		backgroundColor,
		borderRadius,
		mouseEnter,
		mouseLeave,
		toolTipText,
		transitions
	};
</script>

<!-- transition:scale={{ duration: flyProps.duration, x: 0, y: 0 }} -->
{#if rendered}
	<li
		in:inFunc={inOptions}
		out:outFunc={outOptions}
		on:click={() => {
			if (onClick) {
				try {
					onClick.apply();
				} catch (e) {}
			}
		}}
		on:mouseenter={() => {
			if (toolTipText !== undefined && toolTipText !== '') {
				toolTipState.set({ text: toolTipText, show: true });
			}
			if (mouseEnter !== undefined) {
				mouseEnter.call();
			}
		}}
		on:mouseleave={() => {
			if (toolTipText !== undefined && toolTipText !== '') {
				toolTipState.set({ text: toolTipText, show: false });
			}
			if (mouseLeave !== undefined) {
				mouseLeave.call();
			}
		}}
		id={id ? id : undefined}
		class="listItem {className ? className : ''}"
		style="position: relative; top: {top ? top : 'auto'}; left: {left
			? left
			: 'auto'}; width: {width ? width : 'auto'}; height: {height ? height : 'auto'}; {Object.keys(
			figmaImport
		).length > 0
			? figmaImporter(figmaImport, figmaImportConfig)
			: ''}; {horizontalCenter || verticalCenter
			? `transform: translateX(${horizontalCenter == true ? '-50%' : '0px'}) translateY(${
					verticalCenter == true ? '-50%' : '0px'
			  });`
			: ''}; background-color: {backgroundColor !== undefined ? backgroundColor : '#FFFFFF00'};
			margin-top: {iu(marginTop, '0%')};
			margin-bottom: {iu(marginBottom, '0%')};
			border-radius: {((parseFloat(
			iu(borderRadius, '0px')
				.toString()
				.substring(0, iu(borderRadius, '0px').length - 2)
		) *
			100) /
			360 /
			100) *
			lscreenSize.height +
			'px;'};
			 {style}"
	>
		<slot />
	</li>
{/if}

<style>
	.listItem {
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all linear 0.1s;
	}
</style>
