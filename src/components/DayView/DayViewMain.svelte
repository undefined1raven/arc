<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import {
		categories,
		dayViewSelectedDay,
		days,
		tasks,
		tasksLog
	} from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';
	import isMobile from '../../fn/isMobile';
	import { datePadding } from '../../fn/datePadding';
	import timePadding from '../../fn/timePadding';

	$: colorHash = {
		success: $globalStyle.successColor,
		fail: $globalStyle.errorColor,
		pending: $globalStyle.activeColor,
		upcoming: $globalStyle.secondaryMono,
		true: $globalStyle.successColor,
		false: $globalStyle.errorColor
	};

	function getDateTimeDisplayInfo(noteTX) {
		let date = new Date(noteTX);
		let displayDate = `${datePadding(parseFloat(date.getDate()) + 1)}-${datePadding(
			date.getMonth()
		)}-${date.getFullYear()}`;

		let displayTime = `${timePadding(date.getHours())}:${timePadding(
			date.getMinutes()
		)}:${timePadding(date.getSeconds())}`;

		return { displayDate: displayDate, displayTime: displayTime };
	}

	function getRoutineLabelColor(routine) {
		if ($dayViewSelectedDay.status === 'pending') {
			return $globalStyle.activeColor;
		} else if ($dayViewSelectedDay.status === 'upcoming') {
			return $globalStyle.secondaryMono;
		} else {
			return colorHash[routine];
		}
	}

	function getTime(unix) {
		const date = new Date(parseInt(unix));
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	let dayTasks = [];

	$: getDayTasks($dayViewSelectedDay);

	function getDayTasks(dayViewSelectedDay) {
		if (dayViewSelectedDay.status === 'pending') {
			const date = new Date().getDate();
			const month = new Date().getMonth();
			const year = new Date().getFullYear();
			let midNight = new Date(year, month, date, 0, 0, 0, 0).getTime();
			let nextMidnight = new Date(year, month, date + 1, 0, 0, 0, 0).getTime();
			dayTasks = $tasksLog.filter(
				(task) => task.taskStartUnix >= midNight && task.taskStartUnix <= nextMidnight
			);
		} else {
			dayTasks = $tasksLog.filter(
				(task) =>
					task.taskStartUnix >= dayViewSelectedDay?.dayStartUnix &&
					task.taskStartUnix <= dayViewSelectedDay?.dayEndUnix
			);
		}
	}

	$: appendCategoryNameToDayTasks(dayTasks);

	function appendCategoryNameToDayTasks() {
		for (let ix = 0; ix < dayTasks.length; ix++) {
			let categoryID = $tasks.find((elm) => elm.id === dayTasks[ix].taskID)?.categoryID;
			dayTasks[ix].category = $categories.find((elm) => elm.id === categoryID)?.name;
		}
	}

	const dayHash = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wen', 4: 'Thu', 5: 'Fri', 6: 'Sat' };
	const width = 350;
	const topOffset = 6;

	function getCategoryStatsArray(dayTasks) {
		let categories = {};
		for (let ix = 0; ix < dayTasks.length; ix++) {
			if (!categories[dayTasks[ix].category]) {
				categories[dayTasks[ix].category] = {
					count: 1,
					time: dayTasks[ix].taskEndUnix - dayTasks[ix].taskStartUnix,
					timeStr: `${Math.floor(
						(dayTasks[ix].taskEndUnix - dayTasks[ix].taskStartUnix) / 1000 / 60 / 60
					)}h ${Math.floor(
						((dayTasks[ix].taskEndUnix - dayTasks[ix].taskStartUnix) / 1000 / 60) % 60
					)}m`,
					percentage: (
						((dayTasks[ix].taskEndUnix - dayTasks[ix].taskStartUnix) / 86400000) *
						100
					).toFixed(1)
				};
			} else {
				categories[dayTasks[ix].category].count++;

				categories[dayTasks[ix].category].time +=
					dayTasks[ix].taskEndUnix - dayTasks[ix].taskStartUnix;

				categories[dayTasks[ix].category].timeStr = `${Math.floor(
					categories[dayTasks[ix].category].time / 1000 / 60 / 60
				)}h ${Math.floor((categories[dayTasks[ix].category].time / 1000 / 60) % 60)}m`;

				categories[dayTasks[ix].category].percentage = (
					(categories[dayTasks[ix].category].time / 86400000) *
					100
				).toFixed(1);
			}
		}
		let keys = Object.keys(categories);
		let outArray = [];
		for (let ix = 0; ix < keys.length; ix++) {
			outArray.push({
				name: keys[ix],
				count: categories[keys[ix]].count,
				timeStr: categories[keys[ix]].timeStr,
				percentage: categories[keys[ix]].percentage
			});
		}
		return outArray;
	}

	$: getCategoryStatsArray(dayTasks);
</script>

<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor}"
	figmaImport={{
		mobile: { top: 73 + topOffset, width: width, height: 300, left: '50%' },
		desktop: { top: 70, width: 500, height: '80%', left: '50%' }
	}}
	horizontalCenter={true}
	><ul class="tasksList">
		{#if dayTasks.length === 0}
			<ListItem
				width="99%"
				height={isMobile() ? '15%' : '2%'}
				style="margin-bottom: 3%; margin-top: 2%;"
			>
				<Box
					width="99%"
					height="99%"
					backgroundColor="{$globalStyle.activeColor}20"
					transitions={{ in: { func: fly, options: { delay: 80, duration: 200, y: '-4%' } } }}
				/><Label color={$globalStyle.activeMono} text="No task logs to display" /></ListItem
			>
		{/if}
		{#each dayTasks as task, ix}
			<ListItem
				width="99%"
				height={isMobile() ? '15%' : '7%'}
				style="margin-bottom: 3%; margin-top: 0.5%;"
			>
				<Box
					width="99%"
					height="99%"
					style="border: solid 1px {$globalStyle.activeColor};"
					transitions={{ in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } } }}
				>
					<Label
						left="0%"
						text={$tasks.find((elm) => elm.id === task.taskID)?.name}
						color={$globalStyle.activeMono}
						desktopFont={$globalStyle.mediumDesktopFont}
						style="padding-left: 2%; padding-right: 2%;"
					/>
					<Label
						width="25%"
						height="50%"
						text={task.category}
						style="right: 2%;"
						backgroundColor="{$globalStyle.activeColor}20"
						desktopFont={$globalStyle.mediumDesktopFont}
						color={$globalStyle.activeColor}
						borderRadius="3px"
					/>
					<Label
						width="35%"
						height="50%"
						verticalFont={$globalStyle.mediumMobileFont}
						style="right: 30%;"
						text="{getTime(task.taskStartUnix)}-{getTime(task.taskEndUnix)}"
						backgroundColor="{$globalStyle.activeColor}20"
						color={$globalStyle.activeColor}
						desktopFont={$globalStyle.mediumDesktopFont}
						borderRadius="3px"
					/>
				</Box>
			</ListItem>
		{/each}
	</ul></Box
>

<Box
	backgroundColor="{colorHash[$dayViewSelectedDay.status]}10"
	transitions={{
		in: { func: fly, options: { duration: 400, y: '-2%' } }
	}}
	figmaImport={{ mobile: { top: 25 + topOffset, height: 40, width: width, left: '50%' } }}
	horizontalCenter={true}
>
	{#if isMobile()}
		<Label
			width="12%"
			height="100%"
			left="0%"
			backgroundColor="{colorHash[$dayViewSelectedDay.status]}30"
			borderRadius="5px"
			color={colorHash[$dayViewSelectedDay.status]}
			style="border-top-right-radius: 0px; border-bottom-right-radius: 0px; border-right: solid 1px {colorHash[
				$dayViewSelectedDay.status
			]};"
			text={dayHash[
				new Date(
					$dayViewSelectedDay.dayStartUnix ? $dayViewSelectedDay.dayStartUnix : Date.now()
				).getDay()
			]}
		/>
		<Label
			width="25%"
			height="50%"
			left="18%"
			text="Routine"
			backgroundColor="{getRoutineLabelColor($dayViewSelectedDay.routine)}20"
			color={getRoutineLabelColor($dayViewSelectedDay.routine)}
			borderRadius="3px"
		/>
	{/if}
</Box>
<Label
	desktopFont={$globalStyle.smallDesktopFont}
	text={getDateTimeDisplayInfo($dayViewSelectedDay.dayStartUnix).displayDate}
	figmaImport={{ desktop: { top: 25, left: '50%' } }}
	horizontalCenter={true}
/>

<Box
	style="border-top: solid 1px {$globalStyle.activeColor}"
	figmaImport={{ mobile: { top: 384 + topOffset, width: width, height: 185, left: '50%' } }}
	horizontalCenter={true}
	><ul class="tasksList">
		{#if getCategoryStatsArray(dayTasks).length === 0}
			<ListItem width="99%" height="25%" style="margin-bottom: 3%; margin-top: 2%;">
				<Box
					width="99%"
					height="99%"
					backgroundColor="{$globalStyle.activeColor}20"
					transitions={{ in: { func: fly, options: { delay: 80, duration: 200, y: '-4%' } } }}
				/><Label
					color={$globalStyle.activeMono}
					text="No category breakdown to display"
				/></ListItem
			>
		{/if}
		{#each getCategoryStatsArray(dayTasks) as category, ix}
			<ListItem width="99%" height="25%" style="margin-bottom: 3%; margin-top: 2%;">
				<Box
					width="99%"
					height="99%"
					transitions={{ in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } } }}
				>
					<Label
						width="71%"
						height="80%"
						left="0%"
						text={category.name}
						color={$globalStyle.activeMono}
						style="padding-left: 2%; padding-right: 2%; justify-content: start; text-align: start;"
						backgroundColor="{$globalStyle.activeColor}20"
						borderRadius="5px"
					/>
					<Label
						height="80%"
						verticalFont={$globalStyle.mediumMobileFont}
						text="[{category.percentage}%]"
						color={$globalStyle.activeMono}
						style="right: 30%; padding-left: 2%; padding-right: 2%; justify-content: start; text-align: start;"
						borderRadius="5px"
					/>
					<Label
						width="25%"
						height="80%"
						text={category.timeStr}
						style="right: 2%;"
						backgroundColor="{$globalStyle.activeColor}20"
						color={$globalStyle.activeMono}
						borderRadius="5px"
					/>
				</Box>
			</ListItem>
		{/each}
	</ul></Box
>
<Button
	onClick={() => {
		window.location.hash = '#logs';
	}}
	label="Back"
	color={$globalStyle.secondaryMono}
	borderColor={$globalStyle.secondaryMono}
	backgroundColor={$globalStyle.secondaryMono}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{
		mobile: { top: 582 + topOffset, left: '50%', width: width, height: 44 },
		desktop: { top: '90%', left: '50%', width: '15%', height: 60 }
	}}
	horizontalCenter={true}
/>

<style>
	.tasksList {
		position: absolute;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: scroll;
	}
</style>
