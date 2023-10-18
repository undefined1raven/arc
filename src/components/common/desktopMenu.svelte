<script>
	import isMobile from '../../fn/isMobile';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Label from './Label.svelte';
	let lglobalStyles = $globalStyle;
	import ChaseLogo from '../deco/ChaseLogo.svelte';
	import Logo from '../deco/Logo.svelte';
	import HomeDeco from '../deco/HomeDeco.svelte';
	import TeamDeco from '../deco/TeamDeco.svelte';
	import SignUpDeco from '../deco/SignUpDeco.svelte';
	import ChaseCaseDeco from '../deco/ChaseCaseDeco.svelte';
	import JobSimDeco from '../deco/JobSimDeco.svelte';
	import DropdownDeco from '../deco/DropdownDeco.svelte';
	import screenSize from '../../stores/screenSize';
	import menuDynamicLogOutButtonConfig from '../../fn/menuDynamicLogOutButtonConfig';
	import { onMount } from 'svelte';
	import ContactUsDeco from '../deco/ContactUsDeco.svelte';
	import desktopWindowLayoutSelector from '../../stores/desktopWindowLayoutSelectorState';

	let lscreenSize = {};
	let extended = false;
	let notExtendedLeft = -270;
	let menuLeft = notExtendedLeft;
	let menuWidth = 396;
	let top = 45;
	function onViewportReactivityThreshold() {
		if (lscreenSize.minimized) {
			menuWidth = 700;
			notExtendedLeft = -474;
		} else {
			menuWidth = 396;
			notExtendedLeft = -270;
		}
	}

	$: onViewportReactivityThreshold(lscreenSize);

	globalStyle.subscribe((gs) => {
		lglobalStyles = gs;
	});

	let menuButtonStyle = `border-top: solid 1px ${
		lglobalStyles.activeColor
	} !important; backdrop-filter: blur(${extended ? '6px' : '0px'});`;

	screenSize.subscribe((ss) => {
		lscreenSize = ss;
	});

	let lastClickedUnix = 0;

	let options = [
		{ label: 'Home', deco: HomeDeco, path: '/' },
		{ label: 'About Us', deco: Logo, path: '/about' },
		{ label: 'Contact Us', path: '/contact', deco: ContactUsDeco },
		{ label: 'FAQ', path: '/faq', deco: TeamDeco }
	];

	function updateMenuButtonStyle() {
		menuButtonStyle = `border-top: solid 1px ${
			lglobalStyles.activeColor
		} !important; backdrop-filter: blur(${extended ? '6px' : '0px'});`;
	}

	$: updateMenuButtonStyle(extended);
	$: menuLeft = extended ? '0%' : notExtendedLeft;

	function onClickx(e) {
		if (e.target.id != 'toggleButton') {
			extended = false;
		}
		// ?????? works on /enterprise but crashes on our regular paths
		// if (e.target.id != 'optionsList' && e.target.id != 'layoutSelectorToggle') {
		// 	desktopWindowLayoutSelector.update((prev) => {
		// 		return { ...prev, show: false };
		// 	});
		// }
	}

	export { top, options };
</script>

<svelte:body on:click={onClickx} />
{#if !isMobile() && $screenSize.minimized === true}
	<Box
		style="transition: all linear 0.05s; z-index: {extended ? 100 : 15}; position: fixed;"
		figmaImport={{ desktop: { left: menuLeft, top: top, width: menuWidth, height: 343 } }}
	>
		<div class="menuContainer" style="">
			<Button
				hoverOpacityMax={20}
				hoverOpacityMin={0}
				id="toggleButton"
				label=""
				color={$globalStyle.activeMono}
				backgroundColor={$globalStyle.activeColor}
				borderColor={$globalStyle.activeColor}
				figmaImport={{ desktop: { width: 119, height: 76, left: 277, top: '0%' } }}
				figmaImportConfig={{ containerWidth: 396, containerHeight: 343 }}
				className="toggleButton"
				style="border-top-left-radius: 5px;"
				onClick={() => {
					extended = !extended;
				}}
				><DropdownDeco
					id="toggleButton"
					height="70%"
					color={$globalStyle.activeColor}
					style="transform: rotate({extended ? '0deg' : '180deg'}); transition: all linear 0.1s;"
				/></Button
			>
			<ul class="menuListContainer">
				{#each [...options, { ...menuDynamicLogOutButtonConfig(), deco: SignUpDeco }] as optionObj}
					<a draggable="false" href={optionObj.path !== undefined ? optionObj.path : '#'}
						><Button
							onClick={() => {
								if (optionObj.onClick !== undefined) {
									optionObj.onClick.call();
								}
							}}
							hoverOpacityMin="0"
							hoverOpacityMax="20"
							className="desktopMenuButton"
							style={menuButtonStyle}
							><Label
								text={optionObj.label}
								width="70%"
								left="0%"
								height="100%"
								color={$globalStyle.activeMono}
								top="0%"
								style="justify-content: end;"
							/><svelte:component
								this={optionObj.deco}
								style="position: absolute; left: 70%; width: 30%; height: 60%;"
								width={'100%'}
								height={'100%'}
								color={$globalStyle.activeColor}
							/></Button
						></a
					>
				{/each}
			</ul>
		</div>
	</Box>
{/if}

<style>
	:global(.desktopMenuButton) {
		position: relative !important;
		width: 100% !important;
		height: 16% !important;
		border-radius: 0px !important;
		border: none !important;
		transition: backdrop-filter ease-in-out 0.1s !important;
	}
	.menuListContainer {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 67.676767677%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.menuContainer {
		width: 100%;
		height: 100%;
		transition: all linear 0.2s;
		transition: all ease-in-out backdrop-filter 0.2s;
	}
</style>
