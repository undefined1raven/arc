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
	const containerProps = { containerWidth: 529, containerHeight: 672 };
	import { projects, statusArray } from '../../Tess/TessVault';
	import { selectedProjectTask } from './selectedProjectTask';
	import DropdownDeco from '../../deco/DropdownDeco.svelte';
	import DateInput from '../../common/DateInput.svelte';
	import { selectedProject } from './selectedProject';
	import { tasks } from '../../../stores/dayViewSelectedDay';
	import AddDeco from '../../deco/AddDeco.svelte';
	import getRandomInt from '../../../fn/getRandomInt';
	import { v4 } from 'uuid';
	import StatusPicker from '../../common/StatusPicker.svelte';
	import { datePadding } from '../../../fn/datePadding';
	function getStatusFromID(id) {
		return $statusArray.find((elm) => elm.id === id);
	}
	let showStatusPicker = false;
	function updateTask(key, value) {
		projects.update((prev) => {
			const currentTasks = prev[$selectedProject.ix].tasks;
			currentTasks[$selectedProjectTask.ix][key] = value;
			prev[$selectedProject.ix].tasks = currentTasks;
			return prev;
		});
		selectedProjectTask.update((prev) => {
			prev[key] = value;
			return prev;
		});
		const currentIx = $selectedProject.ix;
		selectedProject.set({
			...$projects[$selectedProject.ix],
			ini: true,
			ix: currentIx
		});
	}

	function getDateFromUnix(unix) {
		const date = new Date(unix);
		let locDate = date.toLocaleDateString();
		let revlocDate = `${locDate.split('/')[2]}-${datePadding(locDate.split('/')[0])}-${datePadding(
			locDate.split('/')[1]
		)}`;
		return revlocDate;
	}

	function getTaskIndexFromID(id) {
		return $selectedProject.tasks.findIndex((t) => t.id === id);
	}

	let taskViewMode = false;
</script>

<Box
	figmaImport={{
		desktop: {
			top: 186,
			left: 685,
			width: containerProps.containerWidth,
			height: containerProps.containerHeight
		}
	}}
>
	<Label
		align="start"
		text="Tasks"
		backgroundColor="{$globalStyle.activeColor}20"
		alignPadding="2%"
		transitions={getTransition(1)}
		desktopFont={$globalStyle.verySmallDesktopFont}
		figmaImportConfig={containerProps}
		figmaImport={{
			desktop: { top: '0', left: 0, width: containerProps.containerWidth, height: 26 }
		}}
	/>
	{#if taskViewMode === false}
		<Box
			figmaImportConfig={containerProps}
			figmaImport={{
				desktop: { top: 36, left: '0', width: containerProps.containerWidth, height: 636 }
			}}
		>
			<List
				borderColor={$globalStyle.activeColor}
				borderRadius={$globalStyle.borderRadius}
				width="100%"
				height="100%"
			>
				{#each $selectedProject.tasks.filter((t) => t.active === true) as task, ix}
					<ListItem width="100%" height="10%" style="min-height: 10%;">
						<Label left="2%" text={task.name} desktopFont={$globalStyle.smallDesktopFont} />
						<Label
							style="right: 2%;"
							width="20%"
							height="60%"
							desktopFont={$globalStyle.verySmallDesktopFont}
							text={task.taskRef}
							backgroundColor="{$globalStyle.activeColor}20"
						/>
						<Label
							style="right: 23.5%;"
							width="20%"
							height="60%"
							desktopFont={$globalStyle.verySmallDesktopFont}
							text={getStatusFromID(task.statusID)?.name}
							color={getStatusFromID(task.statusID)?.color}
							backgroundColor="{getStatusFromID(task.statusID)?.color}20"
						/>
						<Button
							onClick={() => {
								selectedProjectTask.set({ ...task, ini: true, ix: getTaskIndexFromID(task.id) });
								taskViewMode = true;
							}}
							style="border-left: none; border-right: none; border-top: {ix === 0
								? 'none'
								: `solid 1px ${$globalStyle.activeColor}}`};
                            border-bottom: {ix !== tasks.length - 1
								? 'none'
								: `solid 1px ${$globalStyle.activeColor}}`};"
							width="100%"
							height="100%"
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							borderRadius={0}
							transitions={getTransition(ix)}
						/>
					</ListItem>
				{/each}
				<ListItem
					width="40%"
					height="15%"
					marginBottom="2%"
					marginTop="4%"
					style="min-height: 15%; transition: all linear 0.2s;"
				>
					<Button
						onClick={() => {
							const newTask = {
								id: `TTX-${v4()}`,
								name: `Task-${getRandomInt(100, 999)}`,
								taskRef: `TTX-${getRandomInt(100, 999)}`,
								description: '[]',
								startUnix: Date.now(),
								endUnix: 0,
								deadline: Date.now() + 172800000,
								statusID: 'STID-1',
								active: true
							};
							projects.update((prev) => {
								const currentTasks = prev[$selectedProject.ix]['tasks'];
								currentTasks.push(newTask);
								prev[$selectedProject.ix]['tasks'] = currentTasks;
								return prev;
							});
							const currentIx = $selectedProject.ix;
							selectedProject.set({
								...$projects[$selectedProject.ix],
								ini: true,
								ix: currentIx
							});
						}}
						width="100%"
						height="100%"
						hoverOpacityMax={20}
						hoverOpacityMin={0}
						style="padding-bottom: 10%;"
						desktopFont={$globalStyle.smallDesktopFont}
						label="Add Task"><AddDeco width="80%" height="30%" top="55%" /></Button
					>
				</ListItem>
			</List>
		</Box>
	{/if}

	{#if taskViewMode === true}
		<Box
			borderColor={$globalStyle.activeColor}
			figmaImportConfig={containerProps}
			figmaImport={{
				desktop: { top: 36, left: '0', width: containerProps.containerWidth, height: 636 }
			}}
		>
			<Button
				onClick={() => {
					taskViewMode = false;
				}}
				style="border: none; border-right: solid 1px {$globalStyle.activeColor}; border-bottom-right-radius: 0px; border-top-right-radius: 0px;"
				figmaImportConfig={containerProps}
				transitions={getTransition(1)}
				hoverOpacityMin={0}
				hoverOpacityMax={20}
				figmaImport={{ desktop: { top: '0', left: '0', width: 74, height: 49 } }}
				><DropdownDeco width="30%" height="80%" /></Button
			>
			<Label
				align="start"
				text={$selectedProjectTask.name}
				backgroundColor="{$globalStyle.activeColor}00"
				alignPadding="2%"
				transitions={getTransition(1)}
				figmaImportConfig={containerProps}
				figmaImport={{ desktop: { top: 1, left: 74, width: 455, height: 49 } }}
				desktopFont={$globalStyle.verySmallDesktopFont}
			/>
			<Box
				transitions={getTransition(1)}
				borderColor={$globalStyle.activeColor}
				figmaImportConfig={containerProps}
				className="line"
				style="border-bottom: none;"
				figmaImport={{
					desktop: { top: 49, left: '0', width: containerProps.containerWidth, height: 1 }
				}}
			/>
		</Box>
		<Label
			align="start"
			text="Name"
			backgroundColor="{$globalStyle.activeColor}20"
			alignPadding="2%"
			transitions={getTransition(2)}
			figmaImportConfig={containerProps}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImport={{ desktop: { top: 96, left: 18, width: 149, height: 41 } }}
		/>
		<Box
			transitions={getTransition(2)}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 96, left: 185, width: 326, height: 41 } }}
		>
			<Input
				value={$selectedProjectTask.name}
				on:onValue={(e) => {
					updateTask('name', e.detail);
				}}
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
			figmaImportConfig={containerProps}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImport={{
				desktop: { top: 151, left: 18, width: 493, height: 41 }
			}}
		/>
		<Box
			transitions={getTransition(3)}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 203, left: 18, width: 493, height: 141 } }}
		>
			<Textarea
				on:onValue={(e) => {
					updateTask('description', e.detail);
				}}
				value={$selectedProjectTask.description}
				desktopFont={$globalStyle.smallDesktopFont}
				padding="2%"
				borderColor={$globalStyle.activeColor}
				width="100%"
				height="100%"
			/>
		</Box>
		<Label
			align="start"
			text="Task Ref"
			backgroundColor="{$globalStyle.activeColor}20"
			alignPadding="2%"
			transitions={getTransition(4)}
			figmaImportConfig={containerProps}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImport={{
				desktop: { top: 358, left: 18, width: 211, height: 41 }
			}}
		/>
		<Box
			transitions={getTransition(4)}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 358, left: 242, width: 269, height: 41 } }}
		>
			<Input
				value={$selectedProjectTask.taskRef}
				on:onValue={(e) => {
					updateTask('taskRef', e.detail);
				}}
				desktopFont={$globalStyle.smallDesktopFont}
				paddingLeft="2%"
				borderColor={$globalStyle.activeColor}
				width="100%"
				height="100%"
			/>
		</Box>
		<Label
			align="start"
			text="Status"
			backgroundColor="{$globalStyle.activeColor}20"
			alignPadding="2%"
			transitions={getTransition(5)}
			figmaImportConfig={containerProps}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImport={{
				desktop: { top: 413, left: 18, width: 211, height: 41 }
			}}
		/>
		<Button
			onClick={() => {
				showStatusPicker = true;
			}}
			label={getStatusFromID($selectedProjectTask.statusID).name}
			color={getStatusFromID($selectedProjectTask.statusID)?.color}
			borderColor={getStatusFromID($selectedProjectTask.statusID)?.color}
			backgroundColor={getStatusFromID($selectedProjectTask.statusID)?.color}
			transitions={getTransition(5)}
			hoverOpacityMax={20}
			hoverOpacityMin={0}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 413, left: 242, width: 269, height: 41 } }}
		/>
		<Label
			align="start"
			text="Deadline"
			backgroundColor="{$globalStyle.activeColor}20"
			alignPadding="2%"
			transitions={getTransition(6)}
			figmaImportConfig={containerProps}
			desktopFont={$globalStyle.smallDesktopFont}
			figmaImport={{
				desktop: { top: 468, left: 18, width: 211, height: 41 }
			}}
		/>
		<DateInput
			on:onValue={(e) => {
				updateTask('deadline', new Date(e.detail).getTime());
			}}
			defaultValue={getDateFromUnix($selectedProjectTask.deadline)}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 468, left: 242, width: 269, height: 41 } }}
			desktopFont={$globalStyle.smallDesktopFont}
		/>
		<Button
			onClick={() => {
				updateTask('active', false);
				taskViewMode = false;
			}}
			label="Remove"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			transitions={getTransition(7)}
			color={$globalStyle.errorColor}
			backgroundColor={$globalStyle.errorColor}
			borderColor={$globalStyle.errorColor}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 548, left: 18, width: 233, height: 50 } }}
			desktopFont={$globalStyle.smallDesktopFont}
		/>
		<Button
			onClick={() => {
				taskViewMode = false;
			}}
			label="Save"
			hoverOpacityMin={0}
			transitions={getTransition(7)}
			hoverOpacityMax={20}
			figmaImportConfig={containerProps}
			figmaImport={{ desktop: { top: 548, left: 278, width: 233, height: 50 } }}
			desktopFont={$globalStyle.smallDesktopFont}
		/>
	{/if}
</Box>
{#if showStatusPicker}
	<StatusPicker
		{statusArray}
		allowPicking={true}
		on:onBack={() => {
			showStatusPicker = false;
		}}
		on:onStatusSelected={(e) => {
			updateTask('statusID', e.detail);
			showStatusPicker = false;
		}}
	/>
{/if}
