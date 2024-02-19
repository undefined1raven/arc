<script>
	import Label from '../../common/Label.svelte';
	import { fade, fly } from 'svelte/transition';
	import { touchStart, touchMove, touchEnd } from '../../../stores/touchGestures';
	import { onMount } from 'svelte';
	import GlobalStyles from '../../../config/GlobalStyles';
	import FigmaImporter from '../../../fn/figmaImporter';
	import globalStyle from '../../../stores/globalStyles';
	import getFigmaImportConfig from '../../../config/FigmaImportConfig';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let figmaImport = {};
	let figmaImportConfig = { ...getFigmaImportConfig() };
	let lnotSignedInMenuState = {};
	let ltouchStart = {};
	let ltouchMove = {};
	let lastTouchMoveUnix = 0;
	let componentArray = [];
	let id = '';
	let width;
	let height;
	let top;
	let left;
	let swipeDirection = 'horizontal'; //'horizontal' | 'vertical'
	let renderedComponent = Label;
	let horizontalActionThreshold = 0.02 * document.documentElement.clientHeight;
	let verticalActionThreshold = 0.02 * document.documentElement.clientHeight;
	let indexMode = true;
	let maxIndex = 0;

	function onSelectedIndexChange(selectedIndex) {
		dispatch('selectedIndexChange', selectedIndex);
	}
	$: onSelectedIndexChange(selectedIndex);

	$: actionThreshold =
		swipeDirection === 'horizontal' ? horizontalActionThreshold : verticalActionThreshold;
	onMount(() => {
		if (componentArray.length > 1) {
			selectedIndex = 1;
			setTimeout(() => {
				selectedIndex = 0;
			}, 10);
		}
		touchStart.subscribe((touches) => {
			ltouchStart = { x: touches[0].clientX, y: touches[0].clientY };
		});
		let delta = 0;

		touchMove.subscribe((touches) => {
			lastTouchMoveUnix = Date.now();
			ltouchMove = { x: touches[0].clientX, y: touches[0].clientY };
			if (swipeDirection === 'horizontal') {
				delta = ltouchStart.x - ltouchMove.x;
			} else {
				delta = ltouchStart.y - ltouchMove.y;
			}
		});

		function onProcessTouchEnd(maxIndex) {
			if (delta > 0) {
				if (selectedIndex + 1 < maxIndex) {
					selectedIndex++;
				} else {
					selectedIndex = 0;
				}
			} else {
				if (selectedIndex - 1 >= 0) {
					selectedIndex--;
				} else {
					selectedIndex = maxIndex - 1;
				}
			}
		}

		touchEnd.subscribe((event) => {
			if (
				Math.abs(delta) > actionThreshold &&
				componentArray.length > 1 &&
				lnotSignedInMenuState.visible != true &&
				Math.abs(Date.now() - lastTouchMoveUnix) < 70
			) {
				onProcessTouchEnd(componentArray.length);
			}
			if (
				Math.abs(delta) > actionThreshold &&
				Math.abs(Date.now() - lastTouchMoveUnix) < 70 &&
				indexMode === true &&
				isNaN(maxIndex) === false &&
				maxIndex >= 0
			) {
				onProcessTouchEnd(maxIndex);
			}
		});
	});
	let lglobalStyles = $globalStyle;
	var selectedIndex = 0;
	let displayLabelForceUpdate = true;
	let showDescription = true;

	function contentTransition() {
		showDescription = false;
		setTimeout(() => {
			showDescription = true;
		}, 50);
	}

	$: svelteComponentValidation(selectedIndex);

	function svelteComponentValidation() {
		if (componentArray[selectedIndex]) {
			renderedComponent = componentArray[selectedIndex];
		} else {
			renderedComponent = Label;
		}
	}

	export {
		componentArray,
		id,
		figmaImport,
		figmaImportConfig,
		width,
		height,
		top,
		left,
		swipeDirection,
		maxIndex,
		indexMode
	};
</script>

<div
	in:fly={{ duration: 350, y: '10vh' }}
	class="productDescriptionContainer flex"
	style="border-radius: {lglobalStyles.borderRadius10}; top: {top ? top : ''}; left: {left
		? left
		: ''}; width: {width ? width : ''}; height: {height ? height : ''}; {FigmaImporter(
		figmaImport,
		figmaImportConfig
	)}"
>
	<div class="productDockDetailsContainer flex">
		<ul class="indexIndicatorList flex">
			{#each componentArray as label, ix}
				<div
					class="indexIndicator"
					style="background-color: {selectedIndex == ix
						? $globalStyle.activeColor
						: $globalStyle.secondaryColor + '80'};"
				/>
			{/each}
		</ul>
	</div>
	{#if showDescription}
		<div
			{id}
			class="descriptionContainer flex"
			in:fly={{ duration: 250, y: '-50%' }}
			out:fly={{ duration: 0, y: '50%' }}
		>
			{#if displayLabelForceUpdate}
				<svelte:component this={renderedComponent} />
			{/if}
		</div>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.indexIndicatorList {
		position: absolute;
		width: 15%;
		height: 5%;
		top: 95%;
		padding: 0;
		margin: 0;
		flex-direction: row;
	}
	.indexIndicator {
		position: relative;
		width: 200%;
		height: 20%;
		border-radius: 200px;
		margin-left: 1%;
		margin-left: 1%;
	}
	.productDockDetailsContainer {
		position: absolute;
		top: 0%;
		width: 100%;
		height: 100%;
		left: 50%;
		transform: translate(-50%);
	}
	.productDescriptionContainer {
		position: absolute;
		top: 13%;
		left: 50%;
		width: 100%;
		height: 75.9%;
	}
</style>
