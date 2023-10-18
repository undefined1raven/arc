<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import MenuBar from '../MenuBar.svelte';
	import {
		categories,
		dayViewSelectedDay,
		days,
		tasks,
		tasksLog
	} from '../../stores/dayViewSelectedDay';
	import { currentActivity } from '../../stores/currentActivity';
	import timePadding from '../../fn/timePadding';
	import screenSize from '../../stores/screenSize';
	import { updateLabel } from '../../stores/updateLabel';

	let weekDataDefault = [
		{ day: 'Sun', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Mon', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Tue', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Wen', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Thu', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Fri', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Sat', status: 'upcoming', routine: true, tasks: true, ini: false }
	];

	$: weekData = [
		{ day: 'Sun', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Mon', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Tue', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Wen', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Thu', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Fri', status: 'upcoming', routine: true, tasks: true, ini: false },
		{ day: 'Sat', status: 'upcoming', routine: true, tasks: true, ini: false }
	];

	const dayHash = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wen', 4: 'Thu', 5: 'Fri', 6: 'Sat' };

	$: colorHash = {
		success: $globalStyle.successColor,
		fail: $globalStyle.errorColor,
		pending: $globalStyle.activeColor,
		upcoming: $globalStyle.secondaryMono
	};
 
	let interval500ms;

	function updateWeekData() {
		weekData = weekDataDefault;
		const dayOfWeek = new Date().getDay();
		weekData[dayOfWeek].status = 'pending';
		let prevWeek;
		if ($days.length - dayOfWeek < 0) {
			prevWeek = $days.slice(0, $days.length);
		} else {
			prevWeek = $days.slice($days.length - dayOfWeek, $days.length);
		}

		if (prevWeek.length === dayOfWeek) {
			for (let ix = 0; ix < prevWeek.length; ix++) {
				weekData[ix] = {
					...prevWeek[ix],
					day: dayHash[new Date(prevWeek[ix].dayStartUnix).getDay().toString()]
				};
			}
		} else {
			let dataGapIndexDelta = dayOfWeek - prevWeek.length;
			for (let ix = 0; ix < weekData.length - 1; ix++) {
				if (ix >= dataGapIndexDelta) {
					try {
						weekData[ix] = {
							...prevWeek[ix - dataGapIndexDelta],
							day: dayHash[new Date(prevWeek[ix - dataGapIndexDelta].dayStartUnix).getDay()]
						};
					} catch (e) {}
				}
			}
		}
		for (let ix = 0; ix < weekData.length; ix++) {
			weekData[ix].ini = true;
		}
	}

	updateLabel.subscribe((label) => {
		updateWeekData();
	});

	onMount(() => {
		window.location.hash = 'home';
		interval500ms = setInterval(() => {
			setUntrackedTimeLabel();
			setTrackedTimeLabel();
		}, 500);
		updateWeekData();
	});

	onDestroy(() => {
		clearInterval(interval500ms);
	});

	function getRoutineTagColor(dayObj) {
		if (dayObj !== undefined) {
			if (dayObj.status === 'pending') {
				return $globalStyle.activeColor;
			} else if (dayObj.status === 'upcoming') {
				return $globalStyle.secondaryMono;
			} else if (dayObj.routine === true) {
				return $globalStyle.successColor;
			} else if (dayObj.routine === false) {
				return $globalStyle.errorColor;
			}
		}
	}

	const currentActivityDockColors = { active: $globalStyle.activeColor, inactive: '#FF6B00' };

	$: currentActivityDockStatus = $currentActivity === null ? 'inactive' : 'active';

	var untrackedTimeLabel = '';
	var trackedTimeLabel = '';
	let taskPickingMode = false;

	function setUntrackedTimeLabel() {
		if ($tasksLog.length > 0) {
			let lastTaskEndUnix = $tasksLog[$tasksLog.length - 1].taskEndUnix;
			let timeDelta = Date.now() - lastTaskEndUnix;
			untrackedTimeLabel =
				timePadding(Math.floor(timeDelta / 1000 / 60 / 60)) +
				':' +
				timePadding(Math.floor(timeDelta / 1000 / 60) % 60) +
				':' +
				timePadding((Math.floor(timeDelta / 1000) % 60) % 60) +
				' | Untracked Time';
		} else {
			untrackedTimeLabel = '';
		}
	}

	function setTrackedTimeLabel() {
		if ($currentActivity !== null) {
			if ($currentActivity.taskStartUnix > 0) {
				let timeDelta = Date.now() - $currentActivity.taskStartUnix;
				trackedTimeLabel =
					timePadding(Math.floor(timeDelta / 1000 / 60 / 60)) +
					':' +
					timePadding(Math.floor(timeDelta / 1000 / 60) % 60) +
					':' +
					timePadding((Math.floor(timeDelta / 1000) % 60) % 60);
			} else {
				trackedTimeLabel = '';
			}
		}
	}
</script>

<Box
	transitions={{
		in: {
			func: fly,
			options: { delay: 100, duration: 400, y: '-2%' }
		}
	}}
	figmaImport={{ mobile: { top: 32, height: 330, width: 350, left: '50%' } }}
	horizontalCenter={true}
>
	<ul class="weekList">
		{#each weekData as dayObj, ix}
			<ListItem
				width="100%"
				height="12%"
				style="margin-bottom: 2%; margin-top: 0.5%"
				backgroundColor="{colorHash[dayObj.status]}05"
			>
				<Box
					width="100%"
					height="100%"
					transitions={{ in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } } }}
				>
					<Button
						onClick={() => {
							if (dayObj.status !== 'upcoming') {
								dayViewSelectedDay.set(dayObj);
								window.location.hash = 'dayView';
							}
						}}
						width="98%"
						height="100%"
						borderColor={colorHash[dayObj.status]}
						backgroundColor={colorHash[dayObj.status]}
						borderRadius="3px"
						hoverOpacityMin={0}
						hoverOpacityMax={dayObj.status === 'upcoming' ? 0 : 20}
					>
						<Label
							color={colorHash[dayObj.status]}
							width="10%"
							height="100%"
							left="2%"
							top="0%"
							style="padding-right: 2%; border-right: solid 1px {colorHash[dayObj.status]};"
							text={dayObj.day}
						/>
						<Label
							color={colorHash[dayObj.status]}
							width="24%"
							height="100%"
							top="0%"
							style="right: 2%;"
							verticalFont={$globalStyle.smallMobileFont}
							text="{dayObj.coverage ? dayObj.coverage + ' coverage' : ''} "
						/>
						<Label
							width="25%"
							height="50%"
							left="18%"
							text="Routine"
							backgroundColor="{getRoutineTagColor(dayObj)}20"
							color={getRoutineTagColor(dayObj)}
							borderRadius="3px"
						/>
					</Button>
				</Box>
			</ListItem>
		{/each}
	</ul></Box
>
<Box
	transitions={{
		in: {
			func: fly,
			options: { delay: 200, duration: 400, y: '-2%' }
		}
	}}
	figmaImport={{ mobile: { top: 355, left: '50%', width: 350, height: 216 } }}
	horizontalCenter={true}
	backgroundColor="{currentActivityDockColors[currentActivityDockStatus]}10"
>
	{#if currentActivityDockStatus === 'inactive'}
		<Label
			text="Select a task to keep track of time"
			color={currentActivityDockColors[currentActivityDockStatus]}
			width="100%"
			left="0%"
			top="20%"
		/>
		<Button
			onClick={() => {
				taskPickingMode = true;
			}}
			label="Task Picker"
			width="80%"
			height="20%"
			hoverOpacityMin={0}
			hoverOpacityMax={30}
			color={currentActivityDockColors[currentActivityDockStatus]}
			borderColor={currentActivityDockColors[currentActivityDockStatus]}
			backgroundColor={currentActivityDockColors[currentActivityDockStatus]}
		/>
		<Label
			text={untrackedTimeLabel}
			color={currentActivityDockColors[currentActivityDockStatus]}
			width="100%"
			left="0%"
			top="70%"
		/>
	{/if}
	{#if currentActivityDockStatus === 'active'}
		<Label
			verticalFont={$globalStyle.largeMobileFont}
			text={trackedTimeLabel}
			color={$globalStyle.activeMono}
			width="100%"
			left="0%"
			top="10%"
		/>
		<Label
			verticalFont="22px"
			text={$tasks.find((task) => task.id === $currentActivity.taskID)?.name}
			color={$globalStyle.activeMono}
			width="100%"
			left="0%"
			top="40%"
		/>
		<Button
			onClick={() => {
				tasksLog.update((old) => {
					return [
						...old,
						{
							taskID: $currentActivity.taskID,
							taskStartUnix: $currentActivity.taskStartUnix,
							taskEndUnix: Date.now()
						}
					];
				});
				localStorage.setItem('currentActivity', 'null');
				currentActivity.set(null);
			}}
			width="90%"
			height="22%"
			label="Done"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			left="5%"
			top="70%"
		/>
	{/if}
</Box>
<!-- <Box
	transitions={{
		in: {
			func: fly,
			options: {
				delay: 300,
				duration: 400,
				y: '-2%'
			}
		}
	}}
	figmaImport={{ mobile: { top: 533, left: '50%', width: 350, height: 40 } }}
	horizontalCenter={true}
	backgroundColor="{$globalStyle.activeColor}10"
/> -->
<MenuBar />

{#if taskPickingMode === true}
	<Box
		style="z-index: 50;"
		figmaImport={{
			mobile: { top: 25, width: '100%', height: '95%', left: '0%' }
		}}
		backgroundColor="#000000CC"
		backdropFilter="blur(5px)"
	/>
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; z-index: 52;"
		figmaImport={{ mobile: { top: 34, width: 350, height: 532, left: '50%' } }}
		horizontalCenter={true}
		><ul class="tasksList">
			{#each $tasks as task, ix}
				<ListItem width="99%" height="8%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								currentActivity.set({ taskID: task.id, taskStartUnix: Date.now() });
								taskPickingMode = false;
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							transitions={{
								in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								width="70%"
								height="50%"
								left="2%"
								style="text-align: start; justify-content: start;"
								color={$globalStyle.activeMono}
								text={task.name}
							/>
							<Label
								backgroundColor="{$globalStyle.activeColor}20"
								width="25%"
								height="50%"
								color={$globalStyle.activeMono}
								text={$categories.find((cat) => cat.id === task.categoryID)?.name}
								style="right: 2%;"
								borderRadius="3px"
							/>
						</Button>
					</Box>
				</ListItem>
			{/each}
		</ul></Box
	>
	<Button
		onClick={() => {
			taskPickingMode = false;
		}}
		label="Back"
		color={$globalStyle.secondaryMono}
		borderColor={$globalStyle.secondaryMono}
		backgroundColor={$globalStyle.secondaryMono}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		style="z-index: 52;"
		figmaImport={{ mobile: { top: 581, left: '50%', width: 350, height: 44 } }}
		horizontalCenter={true}
	/>
{/if}
