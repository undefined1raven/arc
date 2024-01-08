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
	import { dataExplorerParams } from './dataExplorerParams';
	import { tasks } from '../../stores/dayViewSelectedDay';

	let selectedDataSource = 'tasks'; // tasks | categories | groups
	const menuButtonStyle = `border-radius: 0px; border: none; border-bottom: solid 1px ${$globalStyle.activeColor}; border-left: solid 1px ${$globalStyle.activeColor};`;
	const containerConfig = { containerWidth: 336, containerHeight: 402 };
</script>

<Box
	horizontalCenter={true}
	borderColor={$globalStyle.activeColor}
	figmaImport={{
		mobile: {
			top: 119,
			left: '50%',
			width: containerConfig.containerWidth,
			height: containerConfig.containerHeight
		}
	}}
>
	<Button
		style="{menuButtonStyle} border-top-left-radius: {$globalStyle.borderRadius};"
		label="Tasks"
		onClick={() => (selectedDataSource = 'tasks')}
		isSelected={selectedDataSource === 'tasks'}
		figmaImport={{ mobile: { left: '0', top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
	<Button
		style={menuButtonStyle}
		label="Categories"
		onClick={() => (selectedDataSource = 'categories')}
		isSelected={selectedDataSource === 'categories'}
		figmaImport={{ mobile: { left: 112, top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
	<Button
		style="{menuButtonStyle}  border-top-right-radius: {$globalStyle.borderRadius};"
		label="Task Groups"
		isSelected={selectedDataSource === 'groups'}
		onClick={() => (selectedDataSource = 'groups')}
		figmaImport={{ mobile: { left: 223, top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
</Box>
