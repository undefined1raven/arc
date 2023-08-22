<script>
	import Label from '../../common/Label.svelte';
	import { fade, fly } from 'svelte/transition';
	import { touchStart, touchMove, touchEnd } from '../../../stores/touchGestures';
	import { onMount } from 'svelte';
	import GlobalStyles from '../../../config/GlobalStyles';
	import FigmaImporter from '../../../fn/figmaImporter';
	import globalStyle from '../../../stores/globalStyles';
	import getFigmaImportConfig from '../../../config/FigmaImportConfig';
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
	let renderedComponent = Label;
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
		let actionThreshold = 0.02 * document.documentElement.clientHeight;
		touchMove.subscribe((touches) => {
			lastTouchMoveUnix = Date.now();
			ltouchMove = { x: touches[0].clientX, y: touches[0].clientY };
			delta = ltouchStart.x - ltouchMove.x;
		});
		touchEnd.subscribe((event) => {
			if (
				Math.abs(delta) > actionThreshold &&
				componentArray.length > 1 &&
				lnotSignedInMenuState.visible != true &&
				Math.abs(Date.now() - lastTouchMoveUnix) < 70
			) {
				if (delta > 0) {
					if (selectedIndex + 1 < componentArray.length) {
						selectedIndex++;
					} else {
						selectedIndex = 0;
					}
				} else {
					if (selectedIndex - 1 >= 0) {
						selectedIndex--;
					} else {
						selectedIndex = componentArray.length - 1;
					}
				}
			}
		});
	});
	var lglobalStyles = GlobalStyles();
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

	export { componentArray, id, figmaImport, figmaImportConfig, width, height, top, left };
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
