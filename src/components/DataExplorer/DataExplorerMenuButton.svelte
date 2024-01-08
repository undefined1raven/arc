<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import Box from '../common/Box.svelte';
	import { createEventDispatcher } from 'svelte';
	import globalStyle from '../../stores/globalStyles';
	const dispatch = createEventDispatcher();

	let buttonLabel = 'Time Frame';
	let isEnabled = false;
	let displayStageID = 'timeFrameSelector';
	let left = 0;
	let decoComponent = Label;
	let defaultDecoProps = { width: '60%', height: '40%', top: '5%' };
	let decoProps = { width: '60%', height: '40%', top: '5%' };
	let transitionIndex = 1;
	export { buttonLabel, isEnabled, displayStageID, left, decoComponent, decoProps, transitionIndex };
</script>

<Box
	figmaImport={{ mobile: { top: 29, left: left, width: 102, height: 77 } }}
	borderColor="#00000000"
	transitions={getTransition(transitionIndex)}
>
	<Box {...defaultDecoProps} {...decoProps}>
		<svelte:component
			this={decoComponent}
			width="100%"
			height="100%"
			color={isEnabled === true ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		/>
	</Box>
	<Label
		text={buttonLabel}
		transitions={getTransition(3)}
		top="50%"
		height="29%"
		verticalFont={$globalStyle.mediumMobileFont}
		color={isEnabled === true ? $globalStyle.activeMono : $globalStyle.secondaryMono}
	/>
	<Box
		width="50%"
		height="5%"
		top="86%"
		borderColor={isEnabled === true ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		backgroundColor={isEnabled === true
			? $globalStyle.activeColor
			: $globalStyle.activeColor + '00'}
	/>
	<Button
		width="100%"
		height="100%"
		transitions={getTransition(1)}
		hoverOpacityMin={0}
		color={isEnabled === true ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		borderColor={isEnabled === true ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		backgroundColor={isEnabled === true ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		hoverOpacityMax={20}
		onClick={() => {
			dispatch('onSelectedDisplayStage', displayStageID);
		}}
	/>
</Box>
