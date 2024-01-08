<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import { tessPIN } from '../../stores/tessPIN';
	import Ex7Deco from '../deco/EX7Deco.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import EditDeco from '../deco/EditDeco.svelte';
	import AddDeco from '../deco/AddDeco.svelte';
	import ListItem from '../common/ListItem.svelte';
	import List from '../common/List.svelte';
	import StatusPicker from '../common/StatusPicker.svelte';
	import { currentDay, exfArray, logs, statusArray } from './TessVault';
	import { tasks } from '../../stores/dayViewSelectedDay';
	import Input from '../common/Input.svelte';
	import { v4 } from 'uuid';
	import { fly } from 'svelte/transition';
	import { touchMove, touchStart } from '../../stores/touchGestures';
	import screenSize from '../../stores/screenSize';
	import Textarea from '../common/Textarea.svelte';
	import L5sDeco from '../deco/L5sDeco.svelte';
	import LAttributesEditor from './LAttributesEditor.svelte';

	let currentDate = new Date();
	let displayDate =
		currentDate.toLocaleString('default', {
			day: 'numeric',
			month: 'short'
		}) +
		' | ' +
		currentDate.getFullYear();

	let showEXFPicker = false;
	let showStatusPicker = false;
	let showLAtrributesEditor = false;
	let allowPickingInStatusPicker = false;

	let endDayConfirmationStage = false;

	function getStatusObjFromID(statusID) {
		return $statusArray.find((elm) => elm.id === statusID);
	}

	function addTask() {
		currentDay.update((cd) => {
			cd.tasks.push({
				id: `TID-${v4()}`,
				name: `New Task [${v4().split('-')[1]}]`,
				statusID: 'STID-1'
			});
			return cd;
		});
	}

	let selectedTaskID = 'none';
	let swipeStartedTaskID = { id: 'none', clientX: 0 };
	touchStart.subscribe((s) => {
		if (showLAtrributesEditor === false) {
			try {
				const classes = s[0]?.target?.className?.split(' ');
				const taskClassIndex = classes.indexOf('task');
				if (taskClassIndex !== -1) {
				}
				swipeStartedTaskID = { id: classes[taskClassIndex + 1], clientX: s[0].clientX };
			} catch (e) {}
		}
	});

	touchMove.subscribe((tm) => {
		if (showLAtrributesEditor === false) {
			let delta = swipeStartedTaskID.clientX - tm[0].clientX;
			if (delta > 0.2 * $screenSize.width) {
				selectedTaskID = swipeStartedTaskID.id;
			}
		}
	});

	function onSelectedTaskIDChange(selectedTaskID) {
		if (selectedTaskID !== 'none') {
			showStatusPicker = true;
			allowPickingInStatusPicker = true;
		} else {
			showStatusPicker = false;
			allowPickingInStatusPicker = false;
		}
	}

	function getEXF(currentDay) {
		let exf = 0;
		let color = $globalStyle.activeColor;
		for (let ix = 0; ix < currentDay.exfArray.length; ix++) {
			let exfObj = $exfArray.find((elm) => elm.EXFID === currentDay.exfArray[ix]);
			if (exfObj) {
				exf += exfObj?.score;
			}
		}
		if (exf > 0) {
			color = $globalStyle.successColor;
		} else if (exf < 0) {
			color = $globalStyle.errorColor;
		}
		return { score: exf, color: color };
	}

	$: onSelectedTaskIDChange(selectedTaskID);

	function getEXFFromLogsByIndexOffset(indexOffset) {
		let exfObj = $logs[$logs.length - indexOffset];
		let label = 'UNK';
		if (exfObj !== undefined) {
			label = exfObj.exf;
		}
		let color = $globalStyle.inactiveColor;
		if (label === 'UNK') {
			color = $globalStyle.inactiveColor;
		} else if (parseFloat(label) > 0) {
			color = $globalStyle.successColor;
		} else if (parseFloat(label) < 0) {
			color = $globalStyle.errorColor;
		} else if (parseFloat(label) == 0) {
			color = $globalStyle.activeColor;
		}
		return { label: label.toString(), color: color };
	}

	function getPastWeekEXFAverage() {
		let exfSum = 0;
		let exfCount = 0;
		let color = $globalStyle.activeColor;
		for (let ix = 7; ix >= 1; ix--) {
			const dayExf = getEXFFromLogsByIndexOffset(ix).label;
			if (dayExf !== 'UNK') {
				exfSum += parseFloat(dayExf);
				exfCount++;
			}
		}
		const average = (exfSum / exfCount).toFixed(1);
		if (Math.round(average) === 0) {
			color = $globalStyle.activeColor;
		} else if (average > 0) {
			color = $globalStyle.successColor;
		} else if (average < 0) {
			color = $globalStyle.errorColor;
		}

		return { average: isNaN(average) ? 'UNK' : average, color: color };
	}
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
		if (endDayConfirmationStage === true) {
			logs.update((lg) => {
				lg.push({
					exf: getEXF($currentDay).score,
					exfArray: $currentDay.exfArray,
					tasks: $currentDay.tasks,
					tx: $currentDay.tx,
					L5s: $currentDay.L5s
				});
				return lg;
			});
			currentDay.set({
				tx: 0,
				active: false,
				exfArray: [],
				tasks: [],
				L5s: {
					L0: { x: 0, y: 0, color: '#959595' },
					L1: { x: 0, y: 0, color: '#608DFF' },
					L2: { x: 0, y: 0, color: '#1400FF' },
					L3: { x: 0, y: 0, color: '#712EFF' },
					L4: { x: 0, y: 0, color: '#BD00FF' },
					none: { x: 0, y: 0 }
				}
			});
			window.location.hash = 'home';
		} else {
			endDayConfirmationStage = true;
			setTimeout(() => {
				endDayConfirmationStage = false;
			}, 3000);
		}
	}}
	transitions={getTransition(1)}
	label={endDayConfirmationStage ? 'Tap to confirm' : 'End Day'}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 30, left: 195, width: 160, height: 36 } }}
/>

<Label
	text="Tasks"
	transitions={getTransition(2)}
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 75, left: 5, width: 83, height: 36 } }}
/>
<Button
	onClick={() => {
		showLAtrributesEditor = !showLAtrributesEditor;
	}}
	transitions={getTransition(2)}
	label=""
	hoverOpacityMin={showLAtrributesEditor ? 40 : 0}
	hoverOpacityMax={showLAtrributesEditor ? 40 : 20}
	figmaImport={{ mobile: { top: 75, left: 95, width: 56, height: 36 } }}
	><L5sDeco width="50%" height="70%" /></Button
>
{#if showLAtrributesEditor === true}
	<LAttributesEditor />
{/if}
{#if showLAtrributesEditor === false}
	<Button
		onClick={() => {
			showStatusPicker = true;
			allowPickingInStatusPicker = false;
		}}
		transitions={getTransition(2.5)}
		label=""
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		figmaImport={{ mobile: { top: 75, left: 158, width: 95, height: 36 } }}
		><EditDeco width="30%" height="70%" /></Button
	>
	<Button
		onClick={addTask}
		transitions={getTransition(2.5)}
		label=""
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		figmaImport={{ mobile: { top: 75, left: 260, width: 95, height: 36 } }}
		><AddDeco width="30%" height="55%" /></Button
	>

	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; border-top: solid {$currentDay.tasks
			.length > 0
			? '0px'
			: '1px'} {$globalStyle.activeColor};"
		figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 337 } }}
		transitions={getTransition(3)}
	>
		<List width="100%" height="100%">
			{#if $currentDay.tasks.length === 0}
				<Button onClick={addTask} label="Add task" top="20%" width="80%" height="15%" />
			{/if}
			{#each $currentDay.tasks as task, ix}
				<ListItem
					className="task {task.id}"
					style="min-height: 15%;"
					marginBottom="4%"
					marginTop="0%"
					width="100%"
					height="15%"
				>
					<Box
						onSelected={() => {}}
						width="100%"
						height="100%"
						className="task {task.id}"
						transitions={{
							in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
						}}
					>
						<Textarea
							on:onValue={(e) => {
								$currentDay.tasks[ix]['name'] = e.detail;
							}}
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

	<Label
		text="EXF Score"
		style="padding-left: 2%; text-align: start; justify-content: start;"
		borderRadius={$globalStyle.borderRadius}
		transitions={getTransition(4)}
		backgroundColor="{$globalStyle.activeColor}20"
		figmaImport={{ mobile: { top: 472, left: 5, width: 246, height: 36 } }}
	/>
	<Button
		onClick={() => {
			window.location.hash = 'EXFEditor';
		}}
		transitions={getTransition(4)}
		label=""
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		figmaImport={{ mobile: { top: 472, left: 260, width: 94, height: 36 } }}
		><EditDeco width="30%" height="70%" /></Button
	>
	<Button
		onClick={() => {
			showEXFPicker = true;
		}}
		transitions={getTransition(5)}
		label=""
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		figmaImport={{ mobile: { top: 520, left: 260, width: 94, height: 36 } }}
		><AddDeco width="30%" height="55%" /></Button
	>
	<Label
		text={getEXF($currentDay).score.toString()}
		verticalFont={$globalStyle.veryLargeMobileFont}
		borderRadius={$globalStyle.borderRadius}
		transitions={getTransition(5)}
		style="letter-spacing: 1.2vh; background: linear-gradient(270deg, {getEXF($currentDay)
			.color}05 0%, {getEXF($currentDay).color}50 47.19%, {getEXF($currentDay).color}05 99.19%);"
		color={getEXF($currentDay).color}
		backgroundColor="{getEXF($currentDay).color}20"
		figmaImport={{ mobile: { top: 520, left: 5, width: 246, height: 36 } }}
	/>
	<Label
		text="{getPastWeekEXFAverage().average} avg"
		borderRadius={$globalStyle.borderRadius}
		transitions={getTransition(6)}
		backgroundColor="{getPastWeekEXFAverage().color}20"
		color={getPastWeekEXFAverage().color}
		figmaImport={{ mobile: { top: 570, left: 126, width: 107, height: 25 } }}
	/>
	<HorizontalLine
		color={getPastWeekEXFAverage().color}
		style="background: linear-gradient(270deg, {getPastWeekEXFAverage()
			.color} 0%, {getPastWeekEXFAverage().color}10 100%);"
		figmaImport={{ mobile: { top: 582, left: 5, width: 118, height: 1 } }}
		transitions={getTransition(5)}
	/>
	<HorizontalLine
		color={$globalStyle.successColor}
		style="background: linear-gradient(90deg, {getPastWeekEXFAverage()
			.color} 0%, {getPastWeekEXFAverage().color}10 100%);"
		figmaImport={{ mobile: { top: 582, left: 236, width: 118, height: 1 } }}
		transitions={getTransition(5)}
	/>

	<Box figmaImport={{ mobile: { top: 600, left: 16, width: 327, height: 25 } }}>
		<List width="100%" height="100%" direction="row">
			{#each [7, 6, 5, 4, 3, 2, 1] as indexOffset}
				<ListItem style="margin-left: 1%; margin-right: 1%;" width="30%" height="100%">
					<Label
						width="100%"
						height="100%"
						verticalFont={$globalStyle.mediumMobileFont}
						text={getEXFFromLogsByIndexOffset(indexOffset).label}
						borderRadius={$globalStyle.borderRadius}
						transitions={getTransition(6)}
						color={getEXFFromLogsByIndexOffset(indexOffset).color}
						backgroundColor="{getEXFFromLogsByIndexOffset(indexOffset).color}20"
					/>
				</ListItem>
			{/each}
		</List>
	</Box>
{/if}
{#if showStatusPicker}
	<StatusPicker
		on:onBack={() => {
			showStatusPicker = false;
			allowPickingInStatusPicker = false;
			selectedTaskID = 'none';
			swipeStartedTaskID = { id: 'none', clientX: 0 };
		}}
		on:onStatusSelected={(e) => {
			currentDay.update((cd) => {
				const selectedTaskElm = cd.tasks.find((elm) => elm.id === selectedTaskID);
				const selectedTaskIndex = cd.tasks.indexOf(selectedTaskElm);
				if (selectedTaskIndex !== -1) {
					cd.tasks[selectedTaskIndex]['statusID'] = e.detail;
				}
				return cd;
			});
			showStatusPicker = false;
			allowPickingInStatusPicker = false;
			selectedTaskID = 'none';
			swipeStartedTaskID = { id: 'none', clientX: 0 };
		}}
		allowPicking={allowPickingInStatusPicker}
		{statusArray}
	/>
{/if}
{#if showEXFPicker === true}
	<Box
		backgroundColor="#000000AA"
		backdropFilter="blur(5px)"
		transitions={getTransition(1)}
		figmaImport={{
			mobile: { top: 30, left: '0%', width: '100%', height: $screenSize.height - 30 }
		}}
	/>
	<Button
		onClick={() => {
			showEXFPicker = false;
		}}
		transitions={getTransition(2)}
		label="Back"
		figmaImport={{
			mobile: { top: 574, left: 5, width: 350, height: 49 }
		}}
	/>
	<Box
		transitions={getTransition(3)}
		figmaImport={{
			mobile: { top: 30, left: 5, width: 350, height: 530 }
		}}
	>
		<List width="100%" height="100%">
			{#each $exfArray as exf, ix}
				{#if exf.show === true}
					<ListItem marginBottom="4%" width="100%" height="9%">
						<Button
							transitions={{
								in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
							}}
							onClick={() => {
								currentDay.update((cd) => {
									let updatedEXFArr = cd.exfArray;
									updatedEXFArr.push(exf.EXFID);
									cd.exfArray = updatedEXFArr;
									return cd;
								});
								showEXFPicker = false;
							}}
							style="text-align: start; justify-content: start; padding-left: 2%;"
							width="100%"
							height="100%"
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							label={exf.event}
						/>
					</ListItem>
				{/if}
			{/each}
		</List>
	</Box>
{/if}
