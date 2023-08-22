<script>
	import { onMount } from 'svelte';
	import notSignedInMenuState from '../../../stores/mobileNotSignedInMenuState';
	import GlobalStyles from '../../../config/GlobalStyles';
	import Button from '../Button.svelte';
	import { fly } from 'svelte/transition';
	import { touchStart, touchMove, touchEnd } from '../../../stores/touchGestures';
	import screenSize from '../../../stores/screenSize';
	import isMobile from '../../../fn/isMobile';
	import menuDynamicLogOutButtonConfig from '../../../fn/menuDynamicLogOutButtonConfig';
	import isAuthed from '../../../fn/isAuthed';
	import globalStyle from '../../../stores/globalStyles';
	let lscreenSize = {};
	let ltouchStart = {};
	let ltouchMove = {};
	let lnotSignedInMenuState = {};
	$: lglobalStyles = $globalStyle;
	let options = [];
	let root = document.documentElement;
	let initialScreenWidth = root.clientWidth;
	let initialScreenHeight = root.clientHeight;
	let computedTopMenuTop = 0.56875 * root.clientHeight;
	let computedTopMenuHeight = 0.43125 * root.clientHeight;

	onMount(() => {
		screenSize.subscribe((ss) => {
			lscreenSize = ss;
			computedTopMenuTop = 0.56875 * lscreenSize.height;
			computedTopMenuHeight = 0.43125 * lscreenSize.height;
		});
		notSignedInMenuState.subscribe((state) => {
			lnotSignedInMenuState = state;
		});
		touchStart.subscribe((touches) => {
			ltouchStart = { x: touches[0].clientX, y: touches[0].clientY };
		});
		touchMove.subscribe((touches) => {
			ltouchMove = { x: touches[0].clientX, y: touches[0].clientY };
			let delta = ltouchStart.y - ltouchMove.y;
			let actionThreshold = 0.03 * document.documentElement.clientHeight;
			let menuSwipeUpThreshold = 0.95 * document.documentElement.clientHeight;
			if (Math.abs(delta) > actionThreshold && ltouchStart.y < computedTopMenuTop) {
				if (delta < 0) {
					notSignedInMenuState.update((prev) => {
						return {
							visible: prev.visible,
							opacity: 0.59
						};
					});
				}
				if (lnotSignedInMenuState.opacity < 0.6) {
					notSignedInMenuState.update((prev) => {
						return { visible: false, opacity: 1 };
					});
				}
			}
			// if (
			// 	Math.abs(delta) > actionThreshold &&
			// 	ltouchStart.y > menuSwipeUpThreshold &&
			// 	!lnotSignedInMenuState.visible
			// ) {
			// 	notSignedInMenuState.set({ ...lnotSignedInMenuState, visible: true });
			// }
		});
		touchEnd.subscribe((touches) => {
			if (lnotSignedInMenuState.opacity < 0.6 && ltouchStart.y < computedTopMenuTop) {
				notSignedInMenuState.update((prev) => {
					return { visible: false, opacity: 1 };
				});
			}
		});
	});

	let dynamicOptions = options;

	const accountMenuItem = { label: 'Account', path: '/profile' };

	function dynamicallyAddLogOutButton(options) {
		if (isAuthed() === true) {
			dynamicOptions = [menuDynamicLogOutButtonConfig(), { ...accountMenuItem }, ...options];
		} else {
			dynamicOptions = [{ label: 'Log In', path: '/login' }, ...options];
		}
	}

	$: dynamicallyAddLogOutButton(options);

	export { options };
</script>

{#if lnotSignedInMenuState.visible === true && isMobile() === true}
	<div
		id="menuContainer"
		transition:fly={{ duration: 200, y: '100%' }}
		class="notSignedInMenuContainer"
		style="background-color: {$globalStyle.theme === 'dark' ? '#040015ee' : '#999'}; opacity: {lnotSignedInMenuState.opacity}; border-top-right-radius: {lglobalStyles.borderRadius10}; border-top-left-radius: {lglobalStyles.borderRadius10}; border-top: solid 1px {lglobalStyles.activeColor};"
	>
		<div
			class="menuDeco"
			style="background-color: {lglobalStyles.activeColor}; border-radius: {lglobalStyles.borderRadius20}"
		/>
		<ul class="optionsContainer">
			{#each dynamicOptions as optionObj}
				<a href={optionObj.path ? optionObj.path : '#'}
					><Button
						onClick={() => {
							if (optionObj.onClick) {
								optionObj.onClick.apply();
							}
						}}
						width="99%"
						hoverOpacityMin="20"
						hoverOpacityMax="30"
						verticalFont={lglobalStyles.regularMobileFont}
						height="20.464285714%"
						style="margin-bottom: 5.803571429%; position: relative;"
						label={optionObj.label}
					/></a
				>
			{/each}
		</ul>
	</div>
{/if}

<style>
	:global(a) {
		text-decoration: none;
	}
	a:hover {
		background-color: #00000000;
	}
	:global(a:focus) {
		background-color: #00000000;
	}
	.optionsContainer {
		position: absolute;
		left: 50%;
		top: 6.914893617%;
		transform: translate(-50%);
		width: 91.666666667%;
		height: 90%;
		margin: 0;
		padding: 0;
		overflow: scroll;
	}
	.optionsContainer::-webkit-scrollbar {
		display: none;
	}
	.optionsContainer::-webkit-scrollbar {
		width: 0vh;
		height: 0vh;
	}
	.menuDeco {
		display: none;
		position: absolute;
		width: 40%;
		left: 50%;
		height: 2%;
		transform: translate(-50%);
	}
	.notSignedInMenuContainer {
		position: fixed;
		top: 56.875%;
		left: 0%;
		width: 100%;
		height: 43.125%;
		z-index: 50;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
</style>
