<script>
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../../fn/getTransisitions';
	import Box from '../../common/Box.svelte';
	import Button from '../../common/Button.svelte';
	import Label from '../../common/Label.svelte';
	import Ex7Deco from '../../deco/EX7Deco.svelte';
	import List from '../../common/List.svelte';
	import ListItem from '../../common/ListItem.svelte';
	import globalStyle from '../../../stores/globalStyles';
	import { activeTessApp } from '../activeTessApp';
	import Input from '../../common/Input.svelte';
	import Textarea from '../../common/Textarea.svelte';
	import { selectedProject } from './selectedProject';
	import { priorityArray, projects, statusArray } from '../TessVault';
	import StatusPicker from '../../common/StatusPicker.svelte';
	let showStatusPicker = false;
	let showPriorityPicker = false;
	const infoContainerProps = { containerWidth: 484, containerHeight: 672 };

	function getPriorityFromID(id) {
		return $priorityArray.find((elm) => elm.id === id);
	}

	function getStatusFromID(id) {
		return $statusArray.find((elm) => elm.id === id);
	}
</script>

<Box figmaImport={{ desktop: { top: 186, left: 160, width: 484, height: 672 } }}>
	<Label
		align="start"
		text="Info"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(1)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.verySmallDesktopFont}
		figmaImport={{ desktop: { top: '0', left: 0, width: 484, height: 26 } }}
	/>
	<Label
		align="start"
		text="Name"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(2)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImport={{ desktop: { top: 36, left: '0', width: 219, height: 55 } }}
	/>
	<Box
		transitions={getTransition(1)}
		figmaImportConfig={infoContainerProps}
		figmaImport={{ desktop: { top: 36, left: 233, width: 251, height: 55 } }}
	>
		<Input
			on:onValue={(e) => {
				projects.update((prev) => {
					prev[$selectedProject.ix]['name'] = e.detail;
					return prev;
				});
			}}
			value={$selectedProject.name}
			desktopFont={$globalStyle.smallDesktopFont}
			paddingLeft="2%"
			borderColor={$globalStyle.activeColor}
			width="100%"
			height="100%"
		/>
	</Box>
	<Label
		align="start"
		text="Description"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(3)}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={infoContainerProps}
		figmaImport={{ desktop: { top: 109, left: '0', width: 484, height: 55 } }}
	/>
	<Box
		figmaImportConfig={infoContainerProps}
		figmaImport={{ desktop: { top: 178, left: '0', width: 484, height: 153 } }}
		transitions={getTransition(4)}
	>
		<Textarea
			on:onValue={(e) => {
				projects.update((prev) => {
					prev[$selectedProject.ix]['description'] = e.detail;
					return prev;
				});
			}}
			width="100%"
			value={$selectedProject.description}
			height="100%"
			desktopFont={$globalStyle.smallDesktopFont}
			padding="2%"
			borderColor={$globalStyle.activeColor}
		/>
	</Box>
	<Label
		align="start"
		text="Objective"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(5)}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={infoContainerProps}
		figmaImport={{ desktop: { top: 346, left: '0', width: 484, height: 55 } }}
	/>
	<Box
		figmaImportConfig={infoContainerProps}
		figmaImport={{ desktop: { top: 412, left: '0', width: 484, height: 114 } }}
		transitions={getTransition(6)}
	>
		<Textarea
			value={$selectedProject.objective}
			width="100%"
			height="100%"
			on:onValue={(e) => {
				projects.update((prev) => {
					prev[$selectedProject.ix]['objective'] = e.detail;
					return prev;
				});
			}}
			desktopFont={$globalStyle.smallDesktopFont}
			padding="2%"
			borderColor={$globalStyle.activeColor}
		/>
	</Box>
	<Label
		align="start"
		text="Priority"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(7)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImport={{ desktop: { top: 544, left: '0', width: 219, height: 55 } }}
	/>
	<Button
		onClick={() => {
			showPriorityPicker = true;
		}}
		label={getPriorityFromID($selectedProject.priorityID).name}
		color={getPriorityFromID($selectedProject.priorityID).color}
		backgroundColor={getPriorityFromID($selectedProject.priorityID).color}
		borderColor={getPriorityFromID($selectedProject.priorityID).color}
		transitions={getTransition(7)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.smallDesktopFont}
		hoverOpacityMax={30}
		hoverOpacityMin={0}
		figmaImport={{ desktop: { top: 544, left: 233, width: 251, height: 55 } }}
	/>
	<Label
		align="start"
		text="Status"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(8)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImport={{ desktop: { top: 617, left: '0', width: 219, height: 55 } }}
	/>
	<Button
		onClick={() => {
			showStatusPicker = true;
		}}
		label={getStatusFromID($selectedProject.statusID).name}
		color={getStatusFromID($selectedProject.statusID).color}
		backgroundColor={getStatusFromID($selectedProject.statusID).color}
		borderColor={getStatusFromID($selectedProject.statusID).color}
		transitions={getTransition(8)}
		figmaImportConfig={infoContainerProps}
		desktopFont={$globalStyle.smallDesktopFont}
		hoverOpacityMax={30}
		hoverOpacityMin={0}
		figmaImport={{ desktop: { top: 617, left: 233, width: 251, height: 55 } }}
	/>
</Box>
{#if showPriorityPicker}
	<StatusPicker
		statusArray={priorityArray}
		allowPicking={true}
		on:onBack={() => {
			showPriorityPicker = false;
		}}
		on:onStatusSelected={(e) => {
			projects.update((prev) => {
				prev[$selectedProject.ix]['priorityID'] = e.detail;
				return prev;
			});
			const currentIx = $selectedProject.ix;
			selectedProject.set({ ...$projects[currentIx], ini: true, ix: currentIx });
			showPriorityPicker = false;
		}}
	/>
{/if}
{#if showStatusPicker}
	<StatusPicker
		{statusArray}
		allowPicking={true}
		on:onBack={() => {
			showStatusPicker = false;
		}}
		on:onStatusSelected={(e) => {
			projects.update((prev) => {
				prev[$selectedProject.ix]['statusID'] = e.detail;
				return prev;
			});
			const currentIx = $selectedProject.ix;
			selectedProject.set({ ...$projects[currentIx], ini: true, ix: currentIx });
			showStatusPicker = false;
		}}
	/>
{/if}
