<script>
	import { fade } from 'svelte/transition';
	import HamburgerIcon from '../../deco/HamburgerIcon.svelte';
	import Button from '../Button.svelte';
	import GlobalStyles from '../../../config/GlobalStyles';
	import notSignedInMenuState from '../../../stores/mobileNotSignedInMenuState';
	import { touchStart, touchMove, touchEnd } from '../../../stores/touchGestures';
	import { onMount } from 'svelte';
	import isMobile from '../../../fn/isMobile';
	import globalStyle from '../../../stores/globalStyles';
	let lnotSignedInMenuState = {};
	onMount(() => {
		notSignedInMenuState.subscribe((state) => {
			lnotSignedInMenuState = state;
		});
	});
	let path = '/signup';
	let buttonLabel = 'Sign Up';
	let buttonStyle = '';
	let onClick;
	let lglobalStyles = $globalStyle;
	let fadeDuration = 200;
	let fadeDelay = 100;

	$: toggleButtonBkgColor = document.documentElement.style.getPropertyValue('--pageBackground');

	export { fadeDelay, fadeDuration, path, onClick, buttonStyle, buttonLabel };
</script>

{#if isMobile()}
	<div in:fade={{ duration: fadeDuration, delay: fadeDelay }}>
		<Button
			onClick={() => {
				notSignedInMenuState.set({
					opacity: 1,
					visible: !lnotSignedInMenuState.visible
				});
			}}
			style="position: fixed; background-color: #00000000"
			label=""
			color={$globalStyle.activeMono}
			left="72.222222222%"
			top="90.625%"
			width="24.386111111%"
			backgroundColor="{$globalStyle.activeColor}FF"
			borderColor={$globalStyle.activeColor}
			verticalFont={lglobalStyles.regularMobileFont}
			height="7.5%"
			><HamburgerIcon color={$globalStyle.activeColor} width="70%" height="40%" /></Button
		>
		<a href={path ? path : '#'}>
			<Button
				onClick={() => {
					if (onClick) {
						onClick.apply();
					}
				}}
				label={buttonLabel}
				width="65.555555556%"
				height="7.5%"
				hoverOpacityMin="0"
				hoverOpacityMax="10"
				left="3.055555556%"
				color={$globalStyle.activeMono}
				backgroundColor={$globalStyle.activeColor}
				borderColor={$globalStyle.activeColor}
				top="90.625%"
				style="text-shadow: 0px 0px 0px {lglobalStyles.activeMono}; {buttonStyle}"
			/></a
		>
	</div>
{/if}
