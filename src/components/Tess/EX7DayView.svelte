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
	import { currentDay, exfArray, logs, moodsArray, selectedDayObj, statusArray } from './TessVault';
	import { tasks } from '../../stores/dayViewSelectedDay';
	import Input from '../common/Input.svelte';
	import { v4 } from 'uuid';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Textarea from '../common/Textarea.svelte';
	import L5sDeco from '../deco/L5sDeco.svelte';
	import LAttributesEditor from './LAttributesEditor.svelte';
	import MoodLogDeco from '../deco/MoodLogDeco.svelte';
	import MoodLoggerDeco from '../deco/MoodLoggerDeco.svelte';
	import { getTimeFromUnix } from '../../fn/getTimeFromUnix';
	import EflagDeco from '../deco/EflagDeco.svelte';
	const dayHistoryListItemConfig = { containerHeight: 367, containerWidth: 350 };
	const dayHistoryListItemContentConfig = { containerHeight: 70, containerWidth: 350 };

	function getDisplayTimeRangeLabel(moodLog) {
		const startTimeUnix = moodLog.startUnix;
		const endTimeUnix = moodLog.endUnix;
		const displayStartTime = getTimeFromUnix(startTimeUnix);
		const displayEndTime = getTimeFromUnix(endTimeUnix);
		return `${displayStartTime} >>> ${displayEndTime}`;
	}

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

	function getMoodConfig(moodID) {
		return $moodsArray.find((elm) => elm.id === moodID);
	}

	let currentViewMode = 'tasks'; // tasks || exfs || mood
	let selectedMoodLogNote = '';
	let isViewingMoodLogNote = false;
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
		currentViewMode = 'mood';
	}}
	hoverOpacityMin={currentViewMode === 'mood' ? 20 : 0}
	label=""
	color={currentViewMode === 'mood' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
	borderColor={currentViewMode === 'mood' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
	backgroundColor={currentViewMode === 'mood'
		? $globalStyle.activeColor
		: $globalStyle.secondaryColor}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 75, left: 125, width: 110, height: 36 } }}
	><MoodLoggerDeco width="60%" height="60%" color={$globalStyle.activeColor} /></Button
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

{#if currentViewMode === 'mood'}
	{#if isViewingMoodLogNote === false}
		<List figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 455 } }}>
			{#if $selectedDayObj.moodLogs.length === 0}
				<Label
					transitions={getTransition(1)}
					verticalFont={$globalStyle.mediumMobileFont}
					text="No history to display"
					backgroundColor="{$globalStyle.activeColor}20"
					width="70%"
					height="8%"
				/>
			{/if}

			{#each $selectedDayObj.moodLogs as moodLog, ix}
				<ListItem
					marginBottom="4%"
					style="min-height: 15%;"
					transitions={getTransition(ix + 3)}
					figmaImportConfig={dayHistoryListItemConfig}
					figmaImport={{
						mobile: {
							top: 'auto',
							left: '0',
							width: '100%',
							height: dayHistoryListItemContentConfig.containerHeight
						}
					}}
				>
					<Label
						text={getMoodConfig(moodLog.id)?.title}
						color={getMoodConfig(moodLog.id)?.color}
						align="left"
						figmaImportConfig={dayHistoryListItemContentConfig}
						figmaImport={{ mobile: { top: 13, left: 55, width: 211, height: 'auto' } }}
					/>
					<Label
						align="left"
						verticalFont={$globalStyle.mediumMobileFont}
						text={getDisplayTimeRangeLabel(moodLog)}
						color={getMoodConfig(moodLog.id)?.color}
						figmaImportConfig={dayHistoryListItemContentConfig}
						figmaImport={{ mobile: { top: 43, left: 55, width: 211, height: 'auto' } }}
					/>
					<MoodLogDeco color={getMoodConfig(moodLog.id)?.color} left="1.3%" height="50%" />
					<Button
						onClick={() => {
							if (moodLog.note !== null) {
								selectedMoodLogNote = moodLog.note;
								isViewingMoodLogNote = true;
							}
						}}
						width="100%"
						height="100%"
						borderColor={getMoodConfig(moodLog.id)?.color}
						backgroundColor={getMoodConfig(moodLog.id)?.color}
						hoverOpacityMin={5}
						hoverOpacityMax={20}
					/>
					<Label
						verticalFont={$globalStyle.smallMobileFont}
						text={moodLog.note === null ? 'N/A' : 'Note'}
						color={moodLog.note === null
							? $globalStyle.inactiveColor
							: getMoodConfig(moodLog?.id)?.color}
						borderColor={moodLog.note === null
							? $globalStyle.inactiveColor
							: getMoodConfig(moodLog?.id).color}
						figmaImportConfig={dayHistoryListItemContentConfig}
						verticalCenter={true}
						figmaImport={{ mobile: { top: '50%', left: 287, width: 56, height: 18 } }}
					/>
					{#if moodLog.eflag}
						<EflagDeco style="right: 17%;" height="22%" color={getMoodConfig(moodLog?.id)?.color} />
					{/if}
				</ListItem>
			{/each}
		</List>
	{:else}
		<Box
			figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 455 } }}
			backgroundColor="#00000055"
			backdropFilter="blur(20px)"
		>
			<Label
				transitions={getTransition(1)}
				text="Mood Note"
				left="0%"
				verticalFont={$globalStyle.mediumMobileFont}
				top="2%"
			/>
			<HorizontalLine top="6.4%" width="100%" color={$globalStyle.activeColor} />
			<Label
				transitions={getTransition(2)}
				text={selectedMoodLogNote}
				left="0%"
				align="left"
				width="96%"
				verticalFont={$globalStyle.mediumMobileFont}
				top="9%"
			/>
		</Box>
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
		if (isViewingMoodLogNote) {
			isViewingMoodLogNote = false;
		} else {
			window.location.hash = '#home';
		}
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
