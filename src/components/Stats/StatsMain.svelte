<script lang="ts">
	import { LineChart, BarChartStacked, PieChart, StackedAreaChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import Box from '../../components/common/Box.svelte';
	import { fly } from 'svelte/transition';
	import globalStyle from '../../stores/globalStyles';
	import { onMount } from 'svelte';
	import { categories, tasks, tasksLog } from '../../stores/dayViewSelectedDay';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import ListItem from '../common/ListItem.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import getOptions from '../../fn/getChartOptions';
	import getRandomInt from '../../fn/getRandomInt';

	var categoryColors = {};
	var enabledCategories = [];
	var options = getOptions(categoryColors);

	const chartColors = [
		'#2400FF',
		'#8F00FF',
		'#FF0000',
		'#00A3FF',
		'#00FF0A',
		'#FFB800',
		'#7B65FF',
		'#A293FC',
		'#BB65FF',
		'#D43232',
		'#32D4B7',
		'#32D44C',
		'#5C5900',
		'#E0B8FF',
		'#FFB8B8',
		'#B8FFFF',
		'#F1FFB8',
		'#4E6200'
	];

	let viewMode = 'byTask'; /// byTask | byCategory

	const rawDataSource = {
		byCategory: $categories,
		byTask: $tasks
	};

	function iniStats(viewMode) {
		enabledCategories = [];
		let segCount = 0;
		const taskUnixLowerBound = new Date().setHours(0, 0, 0, 0) - 86400000 * (segCount + 1) * 30;
		var taskUnixUpperBound;
		if (segCount === 0) {
			taskUnixUpperBound = new Date().setHours(0, 0, 0, 0) - 86400000;
		} else {
			taskUnixUpperBound = new Date().setHours(0, 0, 0, 0) - 86400000 * segCount * 30;
		}

		const filteredTasks = []; //get all tasks in the prev month
		for (let ix = 0; ix < $tasksLog.length; ix++) {
			if (
				$tasksLog[ix].taskStartUnix >= taskUnixLowerBound &&
				$tasksLog[ix].taskStartUnix <= taskUnixUpperBound
			) {
				filteredTasks.push($tasksLog[ix]);
			}
		}

		let tasksSortedByDay = []; // sort tasks by day
		for (let ix = 0; ix < 30; ix++) {
			let taskUnixLowerBound_local = new Date().setHours(0, 0, 0, 0) - 86400000 * ix;
			let taskUnixUpperBound_local = taskUnixLowerBound_local + 86400000;
			let tasksForDay = [];
			for (let jx = 0; jx < filteredTasks.length; jx++) {
				if (
					filteredTasks[jx].taskStartUnix >= taskUnixLowerBound_local &&
					filteredTasks[jx].taskStartUnix <= taskUnixUpperBound_local
				) {
					tasksForDay.push(filteredTasks[jx]);
				}
			}
			tasksSortedByDay.push(tasksForDay);
		}

		let tasksSortedByCategoryDurationDaily = []; // get daily duration for each category
		let tasksDailyDurationArray = []; // get daily duration for each task

		for (let ix = 0; ix < tasksSortedByDay.length; ix++) {
			let tasksSortedByCategoryDuration = {};
			let tasksDailyDuration = {};
			let dayTasks = tasksSortedByDay[ix];
			for (let jx = 0; jx < dayTasks.length; jx++) {
				let taskID = dayTasks[jx].taskID;
				let taskCategoryID = $tasks.filter((task) => task.id === taskID)[0].categoryID;

				//get daily duration for each task
				if (tasksDailyDuration[taskID] === undefined) {
					tasksDailyDuration[taskID] = parseFloat(
						((dayTasks[jx].taskEndUnix - dayTasks[jx].taskStartUnix) / 1000 / 60 / 60).toFixed(2)
					);
				} else {
					tasksDailyDuration[taskID] += parseFloat(
						((dayTasks[jx].taskEndUnix - dayTasks[jx].taskStartUnix) / 1000 / 60 / 60).toFixed(2)
					);
				}

				//get daily duration for each category
				if (tasksSortedByCategoryDuration[taskCategoryID] === undefined) {
					tasksSortedByCategoryDuration[taskCategoryID] = parseFloat(
						((dayTasks[jx].taskEndUnix - dayTasks[jx].taskStartUnix) / 1000 / 60 / 60).toFixed(2)
					);
				} else {
					tasksSortedByCategoryDuration[taskCategoryID] += parseFloat(
						((dayTasks[jx].taskEndUnix - dayTasks[jx].taskStartUnix) / 1000 / 60 / 60).toFixed(2)
					);
				}
			}
			tasksSortedByCategoryDurationDaily.push(tasksSortedByCategoryDuration);
			tasksDailyDurationArray.push(tasksDailyDuration);
		}

		const dataSource = {
			byCategory: tasksSortedByCategoryDurationDaily,
			byTask: tasksDailyDurationArray
		};

		data = [];
		for (let ix = 0; ix < dataSource[viewMode].length; ix++) {
			//map categories to usable data for chart
			let day = dataSource[viewMode][ix];
			let keys = Object.keys(day);
			if (keys.length > 0) {
				for (let jx = 0; jx < keys.length; jx++) {
					data.push({
						group: keys[jx],
						value: day[keys[jx]],
						date: ix
					});
				}
			} else {
				data.push({ group: 'none', value: 0, date: ix });
			}
		}

		categoryColors = {};
		categoryColors['none'] = '#00000000';
		for (let ix = 0; ix < filteredTasks.length; ix++) {
			let taskID = filteredTasks[ix].taskID;
			let taskCategoryID = $tasks.filter((task) => task.id === taskID)[0]?.categoryID;
			let newColor;
			if (Object.keys(categoryColors).length >= chartColors.length) {
				newColor = `rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(
					0,
					255
				)}, 1)`;
			} else {
				newColor = chartColors[Object.keys(categoryColors).length];
			}
			if (viewMode === 'byCategory') {
				if (categoryColors[taskCategoryID] === undefined) {
					categoryColors[taskCategoryID] = newColor;
					enabledCategories = [
						...enabledCategories,
						{
							id: taskCategoryID,
							color: newColor,
							enabled: true
						}
					];
				}
			} else if (viewMode === 'byTask') {
				if (categoryColors[taskID] === undefined) {
					categoryColors[taskID] = newColor;
					enabledCategories = [
						...enabledCategories,
						{
							id: taskID,
							color: newColor,
							enabled: true
						}
					];
				}
			}
		}
		options = getOptions(categoryColors);
	}

	$: iniStats(viewMode);

	function filterData(enabledCategories) {
		let filteredData = [];
		if (enabledCategories.length === 0) {
			return [];
		} else {
			for (let ix = 0; ix < data.length; ix++) {
				if (data[ix].group !== 'none') {
					if (enabledCategories.find((c) => c.id === data[ix].group).enabled) {
						filteredData.push(data[ix]);
					}
				}
			}
			return filteredData;
		}
	}

	$: emptyDaysCount = data.filter((d) => d.group !== 'none').length;
	let data = [];
</script>

<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor};"
	transitions={{ in: { func: fly, options: { duration: 200, y: '-20%' } } }}
	figmaImport={{ mobile: { top: 28, left: '50%', width: 350, height: 147 } }}
	horizontalCenter={true}
>
	{#if emptyDaysCount === 0}
		<Label style="z-index: 50;" text="No Data" color={$globalStyle.activeMono} />
	{/if}
	<BarChartStacked
		style="background-color: #010007; padding-bottom: 2%;"
		data={filterData(enabledCategories)}
		{options}
	/>
</Box>
<Button
	onClick={() => {
		window.location.hash = 'logs';
	}}
	label="Back"
	color={$globalStyle.secondaryMono}
	borderColor={$globalStyle.secondaryMono}
	backgroundColor={$globalStyle.secondaryMono}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 585, left: '50%', width: 350, height: 44 } }}
	horizontalCenter={true}
/>
<Box
	horizontalCenter={true}
	figmaImport={{ desktop: { width: 350, height: 45, left: '50%', top: 528 } }}
>
	<Button
		onClick={() => {
			viewMode = 'byTask';
		}}
		hoverOpacityMin={0}
		color={viewMode === 'byTask' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
		backgroundColor={viewMode === 'byTask' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		borderColor={viewMode === 'byTask' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		label="By Task"
		left="0%"
		width="48%"
		height="100%"
	/>
	<Button
		onClick={() => {
			viewMode = 'byCategory';
		}}
		hoverOpacityMin={0}
		color={viewMode === 'byCategory' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
		backgroundColor={viewMode === 'byCategory'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		borderColor={viewMode === 'byCategory' ? $globalStyle.activeColor : $globalStyle.secondaryColor}
		label="By Category"
		left="52%"
		width="48%"
		height="100%"
	/>
</Box>
<Button />
<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor}"
	figmaImport={{ mobile: { top: 185, width: 350, height: 332, left: '50%' } }}
	horizontalCenter={true}
	><ul class="tasksList">
		{#if enabledCategories === 0}
			<ListItem width="99%" height="8%" style="margin-bottom: 3%; margin-top: 0.5%;">
				<Box
					width="100%"
					height="100%"
					transitions={{ in: { func: fly, options: { delay: 80, duration: 200, y: '-4%' } } }}
				>
					<Label
						text="No logs to display"
						color={$globalStyle.activeMono}
						width="100%"
						height="100%"
						backgroundColor="{$globalStyle.activeColor}20"
						borderRadius="5px"
					/>
				</Box>
			</ListItem>
		{/if}
		{#each enabledCategories as category, ix}
			{#if category.id !== 'none'}
				<ListItem width="99%" height="15%" style="margin-bottom: 3%; margin-top: 0.5%;">
					<Box
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
						}}
					>
						<Button
							onClick={() => {
								let index = enabledCategories.findIndex((c) => c.id === category.id);
								enabledCategories[index].enabled = !enabledCategories[index].enabled;
							}}
							width="99%"
							height="99%"
							hoverOpacityMin={0}
							hoverOpacityMax={10}
							backgroundColor={enabledCategories[ix]?.enabled
								? categoryColors[category.id]
								: '#999999'}
							style="border: solid 1px {enabledCategories[ix]?.enabled
								? categoryColors[category.id]
								: '#999999'};"
							transitions={{
								in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
							}}
						>
							<Label
								left="2%"
								width="40%"
								height="100%"
								text={rawDataSource[viewMode].find((c) => c.id === category.id)?.name?.toString()}
								color={enabledCategories[ix]?.enabled ? categoryColors[category.id] : '#999999'}
								style="text-align: start; justify-content: start;"
							/>
							<HorizontalLine
								width="20%"
								left="70%"
								style="height: 5%; border-radius: 5px;"
								color={categoryColors[category.id]}
							/>
						</Button>
					</Box>
				</ListItem>
			{/if}
		{/each}
	</ul></Box
>

<style>
	:global(.chart-grid-backdrop) {
		fill: #00000000 !important;
	}
	:global(.header) {
		display: none;
	}
	:global(.checkbox) {
		border: solid 1px #33333300;
	}
</style>
