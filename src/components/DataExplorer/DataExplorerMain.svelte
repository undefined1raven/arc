<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import DataExplorerMenuButton from './DataExplorerMenuButton.svelte';
	import TimeFrameSelector from './TimeFrameSelector.svelte';
	import TimeDeco from '../deco/TimeDeco.svelte';
	import DataSelectionDeco from '../deco/DataSelectionDeco.svelte';
	import ExploreDeco from '../deco/ExploreDeco.svelte';
	import globalStyle from '../../stores/globalStyles';
	import getDateFromUnix from '../../fn/getDateFromUnix';
	import { dataExplorerParams } from './dataExplorerParams';
	import DataSelector from './DataSelector.svelte';
	import Explorer from './Explorer.svelte';

	let displayedStage = 'timeFrameSelector';
	const displayedStageToComponent = {
		timeFrameSelector: TimeFrameSelector,
		dataSelector: DataSelector,
		explorer: Explorer
	};

	$: selectedTimeFrame = $dataExplorerParams.timeframe;
</script>

<svelte:component this={displayedStageToComponent[displayedStage]} />

<DataExplorerMenuButton
	transitionIndex={1}
	decoComponent={TimeDeco}
	left={12}
	buttonLabel="Time Frame"
	on:onSelectedDisplayStage={(e) => {
		displayedStage = e.detail;
	}}
	isEnabled={displayedStage === 'timeFrameSelector'}
	displayStageID={'timeFrameSelector'}
/>
<DataExplorerMenuButton
	transitionIndex={2}
	decoProps={{ width: '35%' }}
	decoComponent={DataSelectionDeco}
	left={129}
	on:onSelectedDisplayStage={(e) => {
		displayedStage = e.detail;
	}}
	buttonLabel="Data Selection"
	isEnabled={displayedStage === 'dataSelector'}
	displayStageID={'dataSelector'}
/>
<DataExplorerMenuButton
	transitionIndex={3}
	decoComponent={ExploreDeco}
	left={246}
	on:onSelectedDisplayStage={(e) => {
		displayedStage = e.detail;
	}}
	buttonLabel="Explore"
	isEnabled={displayedStage === 'explorer'}
	displayStageID={'explorer'}
/>

{#if displayedStage !== 'explorer'}
	<Button
		transitions={{
			in: {
				func: fly,
				options: { delay: 50, duration: 200, y: '15%' }
			}
		}}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		label="Next"
		horizontalCenter={true}
		onClick={() => {
			switch (displayedStage) {
				case 'timeFrameSelector':
					displayedStage = 'dataSelector';
					break;
				case 'dataSelector':
					displayedStage = 'explorer';
					break;
				default:
					displayedStage = 'timeFrameSelector';
					break;
			}
		}}
		figmaImport={{ mobile: { top: 533, width: 336, left: '50%', height: 44 } }}
	/>
{/if}

<Button
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	color={$globalStyle.inactiveColor}
	borderColor={$globalStyle.inactiveColor}
	label="Back"
	onClick={() => {
		window.location.hash = '#logs';
	}}
	figmaImport={{
		mobile: { top: 589, width: displayedStage === 'explorer' ? 163 : 336, left: 12, height: 44 }
	}}
/>
