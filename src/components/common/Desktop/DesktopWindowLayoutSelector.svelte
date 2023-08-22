<script>
	import Box from '../Box.svelte';
	import Button from '../Button.svelte';
	import jobSimEditorWindowManager from '../../../stores/jobSimEditorWindowManager';
	import {windowManager} from '../../../stores/jobSimWindowManager';
	import desktopWindowLayoutSelector from '../../../stores/desktopWindowLayoutSelectorState';
	import globalStyle from '../../../stores/globalStyles';
	import { createEventDispatcher } from 'svelte';
	import TopLeft from '../../deco/DesktopLayoutIcons/topLeft.svelte';
	import TopRight from '../../deco/DesktopLayoutIcons/topRight.svelte';
	import BottomLeft from '../../deco/DesktopLayoutIcons/bottomLeft.svelte';
	import BottomRight from '../../deco/DesktopLayoutIcons/bottomRight.svelte';
	import Full from '../../deco/DesktopLayoutIcons/full.svelte';
	import FullBottom from '../../deco/DesktopLayoutIcons/fullBottom.svelte';
	import FulltTop from '../../deco/DesktopLayoutIcons/fulltTop.svelte';
	import FullLeft from '../../deco/DesktopLayoutIcons/fullLeft.svelte';
	import FullRight from '../../deco/DesktopLayoutIcons/fullRight.svelte';
	import { fly } from 'svelte/transition';

	const layoutDecoHash = {
		topLeft: TopLeft,
		topRight: TopRight,
		bottomLeft: BottomLeft,
		bottomRight: BottomRight,
		full: Full,
		fullBottom: FullBottom,
		fullTop: FulltTop,
		fullLeft: FullLeft,
		fullRight: FullRight
	};

	const dispatch = createEventDispatcher();
	let lglobalStyle = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyle = gs;
	});
	let ldesktopWindowLayoutSelector = $desktopWindowLayoutSelector;
	var windowID = '';
	var windowManagerSourceID = 'enterprise.jobSimEditor'; //enterprise.jobSimEditor | jobSim

	let ljobSimEditorWindowManager = $jobSimEditorWindowManager;
	jobSimEditorWindowManager.subscribe((state) => {
		ljobSimEditorWindowManager = state;
	});

	let ljobSimWindowManager = $windowManager;
	windowManager.subscribe((state) => {
		ljobSimWindowManager = state;
	});

	$: windowManagerStoreMap = {
		'enterprise.jobSimEditor': {
			currentValues: ljobSimEditorWindowManager,
			store: jobSimEditorWindowManager
		},
		jobSim: { currentValues: ljobSimWindowManager, store: windowManager }
	};

	let renderedScreenDockOptions = [];

	desktopWindowLayoutSelector.subscribe((state) => {
		ldesktopWindowLayoutSelector = state;
		windowID = state.windowID;
		windowManagerSourceID = state.windowManagerSourceID;
		if (windowManagerSourceID !== '') {
			let windowManager = windowManagerStoreMap[windowManagerSourceID];
			if (windowManager !== undefined) {
				let windowManagerCurrentValues = windowManager.currentValues;
				const selectedWindow = windowManagerCurrentValues[windowID];
				const compatibleScreenDocks = selectedWindow.compatibleScreenDocks;
				renderedScreenDockOptions = [];
				for (let ix = 0; ix < compatibleScreenDocks.length; ix++) {
					if (compatibleScreenDocks[ix] !== selectedWindow.screenDock) {
						renderedScreenDockOptions.push(compatibleScreenDocks[ix]);
					}
				}
			}
		}
	});
	let layoutManager = {};
	export { windowManagerSourceID, layoutManager };
</script>

<svelte:window
	on:click={(e) => {
		if (
			e.target?.id !== 'desktopWindowLayoutSelector' &&
			e.target?.id !== 'optionsList' &&
			e.target?.id !== 'layoutSelectorToggle'
		) {
			desktopWindowLayoutSelector.update((prev) => {
				return { ...prev, show: false };
			});
		}
	}}
/>

{#if ldesktopWindowLayoutSelector.show === true}
	<Box
		id="desktopWindowLayoutSelector"
		transitions={{
			in: { func: fly, options: { duration: 200, y: '-5%' } }
		}}
		style="z-index: 50;"
		horizontalCenter={true}
		figmaImport={{ desktop: { top: 163, left: '50%', width: 150, height: 805 } }}
	>
		<ul class="optionsList" id="optionsList">
			{#each renderedScreenDockOptions as option}
				<Button
					onClick={() => {
						let windowManager = windowManagerStoreMap[windowManagerSourceID].store;
						let lwindowManager = windowManagerStoreMap[windowManagerSourceID].currentValues;
						if (layoutManager[option]?.id !== windowID) {
							//if the layout is already taken by another window, switch the windows around
							windowManager.update((prev) => {
								let appToBeOverridenID = layoutManager[option].id;
								prev[appToBeOverridenID] = {
									...prev[appToBeOverridenID],
									screenDock: lwindowManager[windowID].screenDock
								};
								return prev;
							});
						}
						if (option === 'full') {
							//if the layout is full, close all other windows
							windowManager.update((prev) => {
								for (let key in prev) {
									if (key !== windowID) {
										prev[key] = {
											...prev[key],
											open: false
										};
									}
								}
								return prev;
							});
						}
						windowManager.update((prev) => {
							dispatch('resetPreviousScreenDock', prev[windowID].screenDock);
							let newWM = prev;

							prev[windowID] = { ...prev[windowID], screenDock: option };

							desktopWindowLayoutSelector.update((prev) => {
								return { ...prev, show: false };
							});
							return newWM;
						});
					}}
					hoverOpacityMin={0}
					hoverOpacityMax={20}
					backdropFilter="blur(10px)"
					horizontalCenter={true}
					style="position: relative; margin-bottom: 5%; z-index: 60;"
					figmaImportConfig={{ containerHeight: 805, containerWidth: 150 }}
					figmaImport={{ desktop: { left: '50%', width: 113, height: 113 } }}
					><svelte:component this={layoutDecoHash[option]} width="80%" height="80%" />
				</Button>
			{/each}
		</ul>
	</Box>
{/if}

<style>
	.optionsList {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		overflow: scroll;
		padding: 0;
		margin: 0;
	}
</style>
