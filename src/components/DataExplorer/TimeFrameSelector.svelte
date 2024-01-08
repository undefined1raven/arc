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
	import DateInput from '../common/DateInput.svelte';
	import Box from '../common/Box.svelte';
	import DropdownDeco from '../deco/DropdownDeco.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import getDateFromUnix from '../../fn/getDateFromUnix';
	const dispatch = createEventDispatcher();
	const dayMillis = 1000 * 60 * 60 * 24 * 1;
	const weekMillis = 1000 * 60 * 60 * 24 * 7;
	const monthMillis = 1000 * 60 * 60 * 24 * 30;

	let selectedPreset = 'lastWeek'; // lastWeek | lastMonth | yesterday | custom

	let selectedTimeFrame = { startUnix: Date.now() - weekMillis, endUnix: Date.now() };
	let isCustomPicking = false;

	function onSelectedPresetChange(selectedPreset) {
		switch (selectedPreset) {
			case 'yesterday':
				selectedTimeFrame = { startUnix: Date.now() - dayMillis, endUnix: Date.now() };
				break;
			case 'lastWeek':
				selectedTimeFrame = { startUnix: Date.now() - weekMillis, endUnix: Date.now() };
				break;
			case 'lastMonth':
				selectedTimeFrame = { startUnix: Date.now() - monthMillis, endUnix: Date.now() };
				break;
			default:
				selectedTimeFrame = { startUnix: Date.now() - weekMillis, endUnix: Date.now() };
				break;
		}
	}

	function onSelectedTimeFrameChange(selectedTimeFrame) {
		dispatch('onTimeframeSelection', selectedTimeFrame);
	}

	onMount(() => {
		onSelectedPresetChange(selectedTimeFrame);
	});

	$: onSelectedTimeFrameChange(selectedTimeFrame);
	$: onSelectedPresetChange(selectedPreset);

	function getDisplayDateFromUnix(unix) {
		const date = new Date(unix);
		return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
	}
</script>

{#if isCustomPicking === false}
	<Label
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 501, left: '50%', width: 153, height: 23 } }}
		text="{getDisplayDateFromUnix(selectedTimeFrame.startUnix)} - {getDisplayDateFromUnix(
			selectedTimeFrame.endUnix
		)}"
		verticalFont={$globalStyle.mediumMobileFont}
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Button
		onClick={() => {
			selectedPreset = 'yesterday';
		}}
		transitions={getTransition(1)}
		verticalFont={$globalStyle.mediumMobileFont}
		horizontalCenter={true}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		isSelected={selectedPreset === 'yesterday'}
		figmaImport={{ mobile: { top: 133, left: '50%', width: 205, height: 44 } }}
		label="Yesterday"
	/>
	<Button
		onClick={() => {
			selectedPreset = 'lastWeek';
		}}
		verticalFont={$globalStyle.mediumMobileFont}
		transitions={getTransition(2)}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		horizontalCenter={true}
		isSelected={selectedPreset === 'lastWeek'}
		figmaImport={{ mobile: { top: 193, left: '50%', width: 205, height: 44 } }}
		label="Last Week"
	/>
	<Button
		onClick={() => {
			selectedPreset = 'lastMonth';
		}}
		verticalFont={$globalStyle.mediumMobileFont}
		hoverOpacityMin={0}
		transitions={getTransition(3)}
		hoverOpacityMax={20}
		isSelected={selectedPreset === 'lastMonth'}
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 253, left: '50%', width: 205, height: 44 } }}
		label="Last Month"
	/>
	<Button
		onClick={() => {
			isCustomPicking = true;
			selectedPreset = 'custom';
		}}
		verticalFont={$globalStyle.mediumMobileFont}
		hoverOpacityMin={0}
		transitions={getTransition(4)}
		hoverOpacityMax={20}
		horizontalCenter={true}
		isSelected={selectedPreset === 'custom'}
		figmaImport={{ mobile: { top: 313, left: '50%', width: 205, height: 44 } }}
		label="Custom"
	/>
{/if}
{#if isCustomPicking === true}
	<Label
		figmaImport={{ mobile: { top: 123, left: 12, width: 48, height: 16 } }}
		text="From"
		transitions={getTransition(1)}
		backgroundColor="{$globalStyle.activeColor}20"
		verticalFont={$globalStyle.smallMobileFont}
	/>
	<Box
		transitions={getTransition(2)}
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 144, left: '50%', width: 336, height: 48 } }}
	>
		<DateInput
			style="padding-right: 2%;"
			on:onUnixValue={(e) => {
				const unixVal = parseInt(e.detail);
				if (unixVal < selectedTimeFrame.endUnix) {
					selectedTimeFrame.startUnix = unixVal;
				}
			}}
			unixDefaultValue={selectedTimeFrame.startUnix}
			width="100%"
			height="100%"
		/>
	</Box>
	<Label
		figmaImport={{ mobile: { top: 208, left: 12, width: 48, height: 16 } }}
		text="Until"
		transitions={getTransition(2)}
		backgroundColor="{$globalStyle.activeColor}20"
		verticalFont={$globalStyle.smallMobileFont}
	/>
	<Box
		transitions={getTransition(4)}
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 229, left: '50%', width: 336, height: 48 } }}
	>
		<DateInput
			style="padding-right: 2%;"
			on:onUnixValue={(e) => {
				const unixVal = parseInt(e.detail);
				if (unixVal > selectedTimeFrame.startUnix) {
					selectedTimeFrame.endUnix = unixVal;
				}
			}}
			unixDefaultValue={selectedTimeFrame.endUnix}
			width="100%"
			height="100%"
		/>
	</Box>

	<Box
		horizontalCenter={true}
		backgroundColor="{$globalStyle.activeColor}20"
		transitions={getTransition(5)}
		figmaImport={{ mobile: { top: 314, left: '50%', width: 205, height: 44 } }}
	>
		<Button
			left="0%"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			onClick={() => {
				isCustomPicking = false;
			}}
			width="30%"
			height="100%"
			style="border: none; border-right: solid 1px {$globalStyle.activeColor};"
			><DropdownDeco width="70%" height="70%" /></Button
		>
		<Label
			verticalFont={$globalStyle.mediumMobileFont}
			align="left"
			text="Custom"
			left="35%"
			width="65%"
		/>
	</Box>
{/if}
