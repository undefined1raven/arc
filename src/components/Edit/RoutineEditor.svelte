<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { categories, dayViewSelectedDay, tasks } from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';

	const width = 350;
	const topOffset = 5;

	let editMode = false;

	$: routineTasks = $tasks.filter((task) => task.isRoutine);

	function getTime(unix) {
		const date = new Date(parseInt(unix));
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	//routine editor
	let selectedElementToEdit = null;
	let selectedTaskForRoutine = null;
	let startTimeInput;
	let endTimeInput;
</script>

{#if editMode === false}
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}"
		figmaImport={{ mobile: { top: 78 + topOffset, width: width, height: 400, left: '50%' } }}
		horizontalCenter={true}
		><ul class="tasksList">
			{#if routineTasks.length === 0}
				<ListItem width="99%" height="8%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{ in: { func: fly, options: { delay: 80, duration: 200, y: '-4%' } } }}
					>
						<Label
							text="No routine tasks"
							color={$globalStyle.activeMono}
							width="100%"
							height="100%"
							backgroundColor="{$globalStyle.activeColor}20"
							borderRadius="5px"
						/>
					</Box>
				</ListItem>
			{/if}
			{#each routineTasks as routineTask, ix}
				<ListItem width="99%" height="10%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								selectedElementToEdit = routineTask;
								if (selectedElementToEdit !== null) {
									selectedTaskForRoutine = $tasks.find(
										(task) => task.id === selectedElementToEdit.id
									);
									startTimeInput = selectedTaskForRoutine.expectedStart;
									endTimeInput = selectedTaskForRoutine.expectedEnd;
								}
								editMode = true;
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							style="border: solid 1px {$globalStyle.activeColor};"
							transitions={{
								in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								left="2%"
								width="70%"
								height="100%"
								style="text-align: start; justify-content: start;"
								text={routineTask.name}
								color={$globalStyle.activeMono}
							/>
							<Label
								width="35%"
								color={$globalStyle.activeMono}
								verticalFont={$globalStyle.mediumMobileFont}
								backgroundColor="{$globalStyle.activeColor}20"
								height="50%"
								style="right: 2%;"
								text="{routineTask.expectedStart}-{routineTask.expectedEnd}"
								borderRadius="3px"
							/>
						</Button>
					</Box>
				</ListItem>
			{/each}
		</ul></Box
	>
	<div in:fade={{ duration: 200, delay: 125 }}>
		<Label
			text="Tap on any routine task to edit"
			top="78%"
			left="50%"
			color={$globalStyle.secondaryMono}
			verticalFont={$globalStyle.smallMobileFont}
			horizontalCenter={true}
		/>
	</div>
	<Box
		transitions={{
			in: { func: fly, options: { delay: 50, duration: 200, y: '20%' } }
		}}
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 518, width: width, height: 44, left: '50%' } }}
	>
		<Button
			onClick={() => {
				selectedTaskForRoutine = $tasks.filter((task) => task.isRoutine)[0];
				startTimeInput = '06:00';
				endTimeInput = '08:00';
				editMode = true;
			}}
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			label="Add task to routine"
		/>
	</Box>
{/if}
{#if editMode === true}
	<Box
		style="z-index: 50;"
		horizontalCenter={true}
		figmaImport={{ mobile: { top: 22, left: '50%', width: '100%', height: 618 } }}
		backgroundColor="#000000CC"
		backdropFilter="blur(5px)"
	/>
	<Label
		backgroundColor="{$globalStyle.activeColor}20"
		borderRadius="5px"
		color={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 34, left: 5, width: 127, height: 30 } }}
		text="Pick a task"
		style="z-index: 52;"
	/>
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; z-index: 52;"
		figmaImport={{ mobile: { top: 78, width: width, height: 379, left: '50%' } }}
		horizontalCenter={true}
		><ul class="tasksList">
			{#each $tasks as task, ix}
				<ListItem width="99%" height="10%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								selectedTaskForRoutine = task;
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={task.id === selectedTaskForRoutine?.id ? 20 : 0}
							hoverOpacityMax={task.id === selectedTaskForRoutine?.id ? 40 : 20}
							style="border: solid 1px {task.id === selectedTaskForRoutine?.id
								? $globalStyle.activeColor
								: $globalStyle.secondaryColor};"
							transitions={{
								in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								left="2%"
								width="70%"
								height="100%"
								text={task.name}
								style="text-align: start; justify-content: start;"
								color={task.id === selectedTaskForRoutine?.id
									? $globalStyle.activeMono
									: $globalStyle.secondaryMono}
							/>
							<Label
								verticalFont={$globalStyle.mediumMobileFont}
								width="25%"
								color={task.id === selectedTaskForRoutine?.id
									? $globalStyle.activeMono
									: $globalStyle.secondaryMono}
								backgroundColor="{task.id === selectedTaskForRoutine?.id
									? $globalStyle.activeColor
									: $globalStyle.secondaryColor}20"
								height="50%"
								text={$categories.find((elm) => elm.id === task.categoryID).name}
								style="right: 2%;"
								borderRadius="3px"
							/>
						</Button>
					</Box>
				</ListItem>
			{/each}
		</ul></Box
	>
	<Label
		style="z-index: 52;"
		text="Start Time"
		backgroundColor={$globalStyle.activeColor + '20'}
		borderRadius="5px"
		color={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 469, left: 5, width: 86, height: 30 } }}
	/>
	<input type="time" class="startTimeInput" bind:value={startTimeInput} />
	<input type="time" class="endTimeInput" bind:value={endTimeInput} />
	<Label
		style="z-index: 52;"
		text="End Time"
		backgroundColor={$globalStyle.activeColor + '20'}
		borderRadius="5px"
		color={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 469, left: 192, width: 86, height: 30 } }}
	/>
	<Box
		style="z-index: 52;"
		figmaImport={{ mobile: { top: 579, left: 5, width: 171, height: 44 } }}
		transitions={{ in: { func: fly, options: { duration: 200, y: '15%' } } }}
	>
		<Button
			onClick={() => {
				tasks.update((tx) => {
					let ix = tx.indexOf(selectedTaskForRoutine);
					tx[ix] = {
						...tx[ix],
						isRoutine: false
					};
					return tx;
				});
				editMode = false;
			}}
			width="100%"
			height="100%"
			label="Remove task from routine"
			style="text-align: center;"
			color={$globalStyle.errorColor}
			borderColor={$globalStyle.errorColor}
			backgroundColor={$globalStyle.errorColor}
			hoverOpacityMin={0}
			hoverOpacityMax={20}
		/>
	</Box>
	<Box
		style="z-index: 52;"
		figmaImport={{ mobile: { top: 579, left: 184, width: 171, height: 44 } }}
		transitions={{ in: { func: fly, options: { duration: 200, y: '15%' } } }}
	>
		<Button
			onClick={() => {
				tasks.update((tx) => {
					let ix = tx.indexOf(selectedTaskForRoutine);
					tx[ix] = {
						...tx[ix],
						expectedStart: startTimeInput,
						expectedEnd: endTimeInput,
						isRoutine: true
					};
					return tx;
				});
				editMode = false;
			}}
			width="100%"
			height="100%"
			label="Save"
			color={$globalStyle.activeMono}
			borderColor={$globalStyle.activeColor}
			backgroundColor={$globalStyle.activeColor}
			hoverOpacityMin={0}
			hoverOpacityMax={20}
		/>
	</Box>
{/if}

<style>
	.startTimeInput {
		position: absolute;
		left: 1.388888889%;
		height: 7.5%;
		width: 45.277777778%;
		top: 79.6875%;
		z-index: 52;
		outline: none;
		border: none;
		color: #fff;
		background-color: #2400ff10;
		border-radius: 10px;
		margin: 0;
		padding: 0;
		font-family: 'Electrolize', sans-serif;
	}
	.endTimeInput {
		position: absolute;
		left: 53.333333333%;
		height: 7.5%;
		width: 45.277777778%;
		top: 79.6875%;
		z-index: 52;
		outline: none;
		border: none;
		color: #fff;
		background-color: #2400ff10;
		border-radius: 10px;
		margin: 0;
		padding: 0;
		font-family: 'Electrolize', sans-serif;
	}
</style>
