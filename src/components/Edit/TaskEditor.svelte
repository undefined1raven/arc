<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import { fade, fly } from 'svelte/transition';
	import { categories, dayViewSelectedDay, tasks } from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';
	import Input from '../common/Input.svelte';

	const width = 350;
	const topOffset = 5;

	let editMode = false;

	let tasksCopy = $tasks;

	function onTasksCopyChange(tasksCopy) {
		tasks.update((old) => {
			old = tasksCopy;
			return old;
		});
	}

	$: onTasksCopyChange(tasksCopy);

	let selectedElementToEdit = null;
	let selectedCategoryForTask = null;

	//new task defaults
	let newTaskInput = 'New Task';
	let newTaskCategoryID = 'null';
</script>

{#if editMode === false}
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}"
		figmaImport={{ mobile: { top: 78 + topOffset, width: width, height: 400, left: '50%' } }}
		horizontalCenter={true}
		><ul class="tasksList">
			{#each tasksCopy.filter((elm) => elm.active === true) as task, ix}
				<ListItem width="99%" height="10%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								selectedElementToEdit = { ...task, ix: $tasks.indexOf(task) };
								if (selectedElementToEdit !== null) {
									selectedCategoryForTask = $categories.find(
										(category) => task.categoryID === category.id
									);
								}
								editMode = true;
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							style="border: solid 1px {$globalStyle.activeColor};"
							transitions={{
								in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								left="2%"
								width="70%"
								height="100%"
								text={task.name}
								style="text-align: start; justify-content: start;"
								color={$globalStyle.activeMono}
							/>
							<Label
								verticalFont={$globalStyle.mediumMobileFont}
								width="25%"
								color={$globalStyle.activeMono}
								backgroundColor="{$globalStyle.activeColor}20"
								height="50%"
								text={$categories.find((elm) => elm.id === task.categoryID)?.name}
								style="right: 2%;"
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
			text="Tap on any task to edit"
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
				selectedElementToEdit = null;
				selectedCategoryForTask = $categories[0];
				editMode = true;
			}}
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			label="Add task"
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
		figmaImport={{ mobile: { top: 29, left: 5, width: 127, height: 30 } }}
		text="Name"
		style="z-index: 52;"
	/>
	<Box
		style="z-index: 52;"
		figmaImport={{ mobile: { top: 66, height: 43, width: width, left: '50%' } }}
		horizontalCenter={true}
	>
		{#if selectedElementToEdit !== null}
			<Input
				width="98%"
				height="100%"
				style="padding-left: 2%;"
				bind:value={tasksCopy[selectedElementToEdit?.ix].name}
				color={$globalStyle.activeMono}
				backgroundColor={$globalStyle.activeColor}
			/>
		{:else}
			<Input
				width="98%"
				height="100%"
				style="padding-left: 2%;"
				bind:value={newTaskInput}
				color={$globalStyle.activeMono}
				backgroundColor={$globalStyle.activeColor}
			/>
		{/if}
	</Box>
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; z-index: 52;"
		figmaImport={{ mobile: { top: 225, width: width, height: 340, left: '50%' } }}
		horizontalCenter={true}
		><ul class="tasksList">
			{#each $categories.filter((elm) => elm.active === true) as category, ix}
				<ListItem width="99%" height="12%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								if (selectedElementToEdit !== null) {
									selectedCategoryForTask = category;
									tasksCopy[selectedElementToEdit.ix].categoryID = category.id;
								} else {
									selectedCategoryForTask = category;
									newTaskCategoryID = category.id;
								}
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={category.id === selectedCategoryForTask?.id ? 20 : 0}
							hoverOpacityMax={category.id === selectedCategoryForTask?.id ? 40 : 20}
							style="border: solid 1px {category.id === selectedCategoryForTask?.id
								? $globalStyle.activeColor
								: $globalStyle.secondaryColor};"
							transitions={{
								in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								left="2%"
								width="20%"
								height="100%"
								style="text-align: start; justify-content: start;"
								text={category.name}
								color={category.id === selectedCategoryForTask?.id
									? $globalStyle.activeMono
									: $globalStyle.secondaryMono}
							/>
						</Button>
					</Box>
				</ListItem>
			{/each}
		</ul></Box
	>
	<Label
		style="z-index: 52;"
		text="Category"
		backgroundColor={$globalStyle.activeColor + '20'}
		borderRadius="5px"
		color={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 185, left: 5, width: 86, height: 30 } }}
	/>

	<Box
		style="z-index: 52;"
		figmaImport={{ mobile: { top: 579, left: 5, width: 171, height: 44 } }}
		transitions={{ in: { func: fly, options: { duration: 200, y: '15%' } } }}
	>
		<Button
			onClick={() => {
				tasksCopy[selectedElementToEdit.ix] = {
					...tasksCopy[selectedElementToEdit.ix],
					active: false
				};
				editMode = false;
			}}
			width="100%"
			height="100%"
			label="Remove task"
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
				if (selectedElementToEdit === null) {
					tasksCopy.push({
						id: `TASK-${Math.random().toString().split('.')[1]}`,
						name: newTaskInput,
						categoryID: newTaskCategoryID,
						active: true
					});
					console.log($tasks);
					tasksCopy = tasksCopy;
				}
				console.log($tasks);
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
