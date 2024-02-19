<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import Ex7Deco from '../deco/EX7Deco.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import ListItem from '../common/ListItem.svelte';
	import List from '../common/List.svelte';
	import { currentDay, exfArray, logs, selectedDayObj, statusArray } from './TessVault';
	import { tasks } from '../../stores/dayViewSelectedDay';
	import Input from '../common/Input.svelte';
	import { v4 } from 'uuid';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Textarea from '../common/Textarea.svelte';
	import L5sDeco from '../deco/L5sDeco.svelte';
	import LAttributesEditor from './LAttributesEditor.svelte';

	let currentDate = new Date($selectedDayObj.tx);
	let displayDate =
		currentDate.toLocaleString('default', {
			day: 'numeric',
			month: 'short'
		}) +
		' | ' +
		currentDate.getFullYear();

	function getStatusObjFromID(statusID) {
		return $statusArray.find((elm) => elm.id === statusID);
	}
	function getEXFObjFromID(exfID) {
		return $exfArray.find((elm) => elm.EXFID === exfID);
	}
	let currentViewMode = 'tasks'; // tasks || exfs

	onMount(() => {
		if ($selectedDayObj.ini === false) {
			window.location.hash = 'home';
		}
	});

	$: restorable = Date.now() - $selectedDayObj.tx < 1000 * 60 * 60 * 24;
</script>

<Ex7Deco
	width="80%"
	height="50%"
	style="opacity: 0.05; transform: translate(-50%, -50%);"
	top="50%"
	left="50%"
/>

<Label
	text={displayDate}
	transitions={getTransition(1)}
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	style="text-align: start; justify-content: start; padding-left: 2%;"
	figmaImport={{ mobile: { top: 30, left: 5, width: 183, height: 36 } }}
/>

<Button
	onClick={() => {
		logs.update((lgs) => {
			lgs.splice($selectedDayObj.ix, 1);
			window.location.hash = 'home';
			return lgs;
		});
	}}
	color={$globalStyle.errorColor}
	borderColor={$globalStyle.errorColor}
	backgroundColor={$globalStyle.errorColor}
	label="Delete Day"
	transitions={getTransition(1)}
	figmaImport={{ mobile: { top: 30, left: 195, width: 160, height: 36 } }}
/>

<Button
	onClick={() => {
		currentViewMode = 'tasks';
	}}
	label="Tasks"
	hoverOpacityMin={currentViewMode === 'tasks' ? 20 : 0}
	color={currentViewMode === 'tasks' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
	borderColor={currentViewMode === 'tasks' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
	backgroundColor={currentViewMode === 'tasks'
		? $globalStyle.activeColor
		: $globalStyle.secondaryColor}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 75, left: 5, width: 110, height: 36 } }}
/>

<Button
	onClick={() => {
		currentViewMode = 'exfs';
	}}
	hoverOpacityMin={currentViewMode === 'exfs' ? 20 : 0}
	label="EXFs"
	color={currentViewMode === 'exfs' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
	borderColor={currentViewMode === 'exfs' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
	backgroundColor={currentViewMode === 'exfs'
		? $globalStyle.activeColor
		: $globalStyle.secondaryColor}
	transitions={getTransition(3)}
	figmaImport={{ mobile: { top: 75, left: 245, width: 110, height: 36 } }}
/>

<Button
	onClick={() => {
		currentViewMode = 'L5s';
	}}
	hoverOpacityMin={currentViewMode === 'L5s' ? 20 : 0}
	label=""
	color={currentViewMode === 'L5s' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
	borderColor={currentViewMode === 'L5s' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
	backgroundColor={currentViewMode === 'L5s'
		? $globalStyle.activeColor
		: $globalStyle.secondaryColor}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 75, left: 125, width: 110, height: 36 } }}
	><L5sDeco width="60%" height="50%" color={$globalStyle.activeColor} /></Button
>
{#if currentViewMode === 'tasks'}
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; border-top: solid {$currentDay.tasks
			.length > 0
			? '0px'
			: '1px'} {$globalStyle.activeColor};"
		figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 442 } }}
		transitions={getTransition(3)}
	>
		<List width="100%" height="100%">
			{#if $selectedDayObj.tasks.length === 0}
				<Label
					backgroundColor="{$globalStyle.activeColor}20"
					borderRadius={$globalStyle.borderRadius}
					text="No tasks to view"
					top="20%"
					width="80%"
					height="10%"
				/>
			{/if}
			{#each $selectedDayObj.tasks as task, ix}
				<ListItem
					className="task {task.id}"
					style="min-height: 12%;"
					marginBottom="4%"
					marginTop="0%"
					width="100%"
					height="12%"
				>
					<Box
						width="100%"
						height="100%"
						className="task {task.id}"
						transitions={{
							in: { func: fly, options: { delay: ix * 20, duration: 200, y: '-4%' } }
						}}
					>
						<Textarea
							readonly={true}
							className="task {task.id}"
							color={getStatusObjFromID(task.statusID)?.color}
							backgroundColor="{getStatusObjFromID(task.statusID)?.color}00"
							borderColor={getStatusObjFromID(task.statusID)?.color}
							top="0%"
							verticalFont={$globalStyle.mediumMobileFont}
							style="padding-top: 6%; padding-right: 35%; padding-left: 2%; background: linear-gradient(270deg, {getStatusObjFromID(
								task.statusID
							)?.color} 0.03%, {getStatusObjFromID(task.statusID)
								?.color}25 0.04%, {getStatusObjFromID(task.statusID)
								?.color}00 99.96%, {getStatusObjFromID(task.statusID)?.color}00 99.96%);"
							width="100%"
							height="100%"
							defaultValue={task.name}
						/>
						<Label
							className="task {task.id}"
							text={getStatusObjFromID(task.statusID)?.name}
							color={getStatusObjFromID(task.statusID)?.color}
							verticalFont={$globalStyle.mediumMobileFont}
							borderRadius={$globalStyle.borderRadius}
							height="50%"
							width="34%"
							style="right: 2%;"
							backgroundColor="{getStatusObjFromID(task.statusID)?.color}20"
						/>
					</Box>
				</ListItem>
			{/each}
		</List>
	</Box>
{/if}

{#if currentViewMode === 'L5s'}
	{#if $selectedDayObj.L5s !== undefined}
		<LAttributesEditor readOnly={true} positions={$selectedDayObj.L5s} />
	{:else}
		<Label
			horizontalCenter={true}
			left="50%"
			backgroundColor="{$globalStyle.activeColor}20"
			borderRadius={$globalStyle.borderRadius}
			text="No L5s to view"
			top="20%"
			width="80%"
			height="7%"
		/>
	{/if}
{/if}

{#if currentViewMode === 'exfs'}
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; border-top: solid {$currentDay.tasks
			.length > 0
			? '0px'
			: '1px'} {$globalStyle.activeColor};"
		figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 442 } }}
		transitions={getTransition(3)}
	>
		<List width="100%" height="100%">
			{#if $selectedDayObj.exfArray.length === 0}
				<Label
					backgroundColor="{$globalStyle.activeColor}20"
					borderRadius={$globalStyle.borderRadius}
					text="No EXFs to view"
					top="20%"
					width="80%"
					height="10%"
				/>
			{/if}
			{#each $selectedDayObj.exfArray as exf, ix}
				<ListItem
					style="min-height: 12%;"
					marginBottom="4%"
					marginTop="0%"
					width="100%"
					height="12%"
				>
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 20, duration: 200, y: '-4%' } }
						}}
					>
						<Input
							readonly={true}
							top="0%"
							verticalFont={$globalStyle.mediumMobileFont}
							width="100%"
							height="100%"
							style="padding-left: 2%;"
							defaultValue={getEXFObjFromID(exf)?.event}
						/>
						<Label
							text={getEXFObjFromID(exf)?.score}
							verticalFont={$globalStyle.mediumMobileFont}
							borderRadius={$globalStyle.borderRadius}
							height="50%"
							width="34%"
							backgroundColor="{$globalStyle.activeColor}20"
							style="right: 2%;"
						/>
					</Box>
				</ListItem>
			{/each}
		</List>
	</Box>
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
	verticalFont={$globalStyle.mediumMobileFont}
	label="Back"
	onClick={() => {
		window.location.hash = '#home';
	}}
	figmaImport={{ mobile: { top: 574, width: restorable ? 170 : 350, left: 5, height: 44 } }}
/>
{#if restorable}
	<Button
		transitions={{
			in: {
				func: fly,
				options: { duration: 200, y: '15%' }
			}
		}}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		color={$globalStyle.errorColor}
		verticalFont={$globalStyle.mediumMobileFont}
		borderColor={$globalStyle.errorColor}
		label="Restore as current day"
		onClick={() => {
			currentDay.set({ ...$selectedDayObj, active: true });
			logs.update((lgs) => {
				lgs.splice($selectedDayObj.ix, 1);
				window.location.hash = 'home';
				return lgs;
			});
			window.location.hash = '#EX7currentDay';
		}}
		figmaImport={{ mobile: { top: 574, width: 170, left: 185, height: 44 } }}
	/>
{/if}
