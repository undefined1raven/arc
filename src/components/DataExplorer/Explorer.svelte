<script lang="ts">
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import { chunkArray } from '../../fn/chunkArray';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import { categories, tasks, tasksLog } from '../../stores/dayViewSelectedDay';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { dataExplorerParams } from './dataExplorerParams';
	import ExplorerCharts from './ExplorerCharts.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { allowMenuSwipe } from '../../stores/allowMenuSwpite';
	import getDateFromUnix from '../../fn/getDateFromUnix';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import '@carbon/charts/styles.css';
	import { HeatmapChart, DonutChart } from '@carbon/charts';
	import VerticalLine from '../common/VerticalLine.svelte';
	import { fly } from 'svelte/transition';
	import { getAverageTaskStartTime } from './explorerGetAverageTaskStartTime';
	import DropdownDeco from '../deco/DropdownDeco.svelte';

	let displayMode = 'data'; //data | charts
	let selectedAverageType = 'duration'; //duration | startTime | endTime
	const selectedAvgTypeToLabel = {
		duration: 'Average Duration',
		startTime: 'Average Start Time',
		endTime: 'Average End Time'
	};

	let dailyStatsViewCurrentChunkIndex = 0;

	function getAvgValueFromType(dataMember, ix, selectedAverageType) {
		let taskStats = averageTaskStartAndEndStats[ix];
		if (selectedAverageType === 'duration') {
			return computeDayilyAverage(dataMember);
		} else if (selectedAverageType === 'startTime') {
			return taskStats.avgTaskStart;
		} else if (selectedAverageType === 'endTime') {
			return taskStats.avgTaskEnd;
		}
	}

	function getDataMembersNamesFromExplorerParams(explorerParams) {
		let dataMemberNames = [];
		for (let ix = 0; ix < explorerParams.selectedTaskIDs.length; ix++) {
			const taskID = explorerParams.selectedTaskIDs[ix];
			let taskName = $tasks.find((elm) => elm.id === taskID).name;
			dataMemberNames.push({ name: taskName, id: taskID });
		}
		for (let ix = 0; ix < explorerParams.selectedCategoriesIDs.length; ix++) {
			const categoryID = explorerParams.selectedCategoriesIDs[ix];
			let categoryName = $categories.find((elm) => elm.id === categoryID).name;
			dataMemberNames.push({ name: categoryName, id: categoryID });
		}
		return dataMemberNames;
	}

	$: dataMemberNames = getDataMembersNamesFromExplorerParams($dataExplorerParams);

	onMount(() => {
		allowMenuSwipe.set(false);
	});

	onDestroy(() => {
		allowMenuSwipe.set(true);
	});

	let listDOMs = [];

	let globalScrollLeft = 0;

	function onGlobalScrollLeftChange(globalScrollLeft) {
		///sync scrollLeft across all lists
		for (let ix = 0; ix < listDOMs.length; ix++) {
			if (listDOMs[ix].scrollLeft !== undefined) {
				listDOMs[ix].scrollLeft = globalScrollLeft;
			}
		}
	}

	$: onGlobalScrollLeftChange(globalScrollLeft);

	function getDisplayDateFromUnix(unix) {
		const date = new Date(unix);
		return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
	}

	const filteredTasks = $tasksLog.filter(
		(elm) =>
			$dataExplorerParams.selectedTaskIDs.indexOf(elm.taskID) !== -1 &&
			elm.taskStartUnix > $dataExplorerParams.timeframe.startUnix &&
			elm.taskStartUnix < $dataExplorerParams.timeframe.endUnix
	);

	let dailyBreakdownArray = {}; ///used for global stats (avg and totals)
	let dailyNaNAppendedBreakdownArray = {}; ///used as an intermediary for daily grid display (adds NaN to the tasks that weren't logged in a day but are still part of the dataMembers)
	let flatennedDailyNaNAppendedBreakdownArray = {}; /// used for the actual daily grid display
	let durationTotalsByTask = {}; //global duration totals for each task
	// let taskIDMonthPairs = [];

	$: averageTaskStartAndEndStats = getAverageTaskStartTime(filteredTasks, dataMemberNames);

	function getDailyBreakdownArray() {
		for (let ix = 0; ix < filteredTasks.length; ix++) {
			const task = filteredTasks[ix];
			const taskID = task.taskID;
			const taskStartUnix = task.taskStartUnix;
			const taskDuration = task.taskEndUnix - taskStartUnix;

			///add to daily breakdown array
			if (dailyBreakdownArray[getDateFromUnix(taskStartUnix)] === undefined) {
				dailyBreakdownArray[getDateFromUnix(taskStartUnix)] = [
					{ taskID: taskID, duration: taskDuration }
				];
			} else {
				dailyBreakdownArray[getDateFromUnix(taskStartUnix)] = [
					...dailyBreakdownArray[getDateFromUnix(taskStartUnix)],
					{
						taskID: taskID,
						duration: taskDuration,
						taskStartUnix: taskStartUnix,
						taskEndUnix: task.taskEndUnix
					}
				];
			}

			///fill days where no tasks have been selected with an empty array to show all days in crono order
			const selectedDaysCount = (
				($dataExplorerParams.timeframe.endUnix - $dataExplorerParams.timeframe.startUnix) /
				1000 /
				60 /
				60 /
				24
			).toFixed(0);
			for (let ix = 0; ix < selectedDaysCount; ix++) {
				const date = getDateFromUnix(
					$dataExplorerParams.timeframe.startUnix + ix * (1000 * 60 * 60 * 24)
				);
				if (dailyBreakdownArray[date] === undefined) {
					dailyBreakdownArray[date] = [];
				}
			}
			// for (
			// 	let ix = $dataExplorerParams.timeframe.startUnix;
			// 	ix < $dataExplorerParams.timeframe.endUnix;
			// 	ix =+ ((1000 * 60 * 60 * 60 * 24) + 10)
			// ) {
			// 	const date = getDateFromUnix(ix);
			// 	console.log(ix);
			// 	if (dailyBreakdownArray[date] === undefined) {
			// 		dailyBreakdownArray[date] = [];
			// 	}
			// }

			// ///add to duration totals array
			// if (durationTotalsByTask[taskID] === undefined) {
			// 	durationTotalsByTask[taskID] = taskDuration;
			// } else {
			// 	durationTotalsByTask[taskID] += taskDuration;
			// }

			// ///beta heatmap
			// const taskStartMonth = new Date(taskStartUnix).toLocaleString('default', { month: 'long' });
			// const existingIndex = heatmapData.indexOf(
			// 	(elm) => elm.letter === taskID && elm.month === taskStartMonth
			// );

			// if (
			// 	taskIDMonthPairs.findIndex(
			// 		(elm) => elm.month === taskStartMonth && elm.taskID === taskID
			// 	) === -1
			// ) {
			// 	taskIDMonthPairs.push({ month: taskStartMonth, taskID: taskID });
			// }
			// if (existingIndex === -1) {
			// 	heatmapData.push({
			// 		letter: taskID,
			// 		value: (taskDuration / 1000 / 60).toFixed(2),
			// 		month: new Date(taskStartUnix).toLocaleString('default', { month: 'long' })
			// 	});
			// } else {
			// 	const elm = heatmapData[existingIndex];
			// 	heatmapData[existingIndex] = {
			// 		...elm,
			// 		duration: elm.value + (taskDuration / 1000 / 60).toFixed(2)
			// 	};
			// }
		}
	}

	function getDailyNaNAppendedBreakdownArray(dailyBreakdownArray) {
		const keys = Object.keys(dailyBreakdownArray);
		for (let ix = 0; ix < keys.length; ix++) {
			let dayTasksArray = dailyBreakdownArray[keys[ix]];
			for (let ixx = 0; ixx < dataMemberNames.length; ixx++) {
				if (dayTasksArray.findIndex((elm) => elm.taskID === dataMemberNames[ixx].id) === -1) {
					dayTasksArray = [...dayTasksArray, { taskID: dataMemberNames[ixx].id, duration: NaN }];
				}
			}
			dailyNaNAppendedBreakdownArray[keys[ix]] = dayTasksArray;
		}
	}

	const daysInSelectedTimeframe = Math.ceil(
		($dataExplorerParams.timeframe.endUnix - $dataExplorerParams.timeframe.startUnix) /
			1000 /
			60 /
			60 /
			24
	);

	// let heatmapData = [];
	// const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
	// let data = [];

	function flattenDailyNaNAppendedBreakdownArray(dayArray) {
		/// uses a dayArray from the dailyBreakdownArray to get the total duration for each task in that day and returns to flattened dayArray
		let map = {};
		let out = [];
		for (let ix = 0; ix < dayArray.length; ix++) {
			const task = dayArray[ix];
			if (isNaN(task.duration) === false) {
				if (map[task.taskID] === undefined) {
					map[task.taskID] = task.duration;
				} else {
					map[task.taskID] += task.duration;
				}
			} else {
				map[task.taskID] = NaN;
			}
		}
		const mapKeys = Object.keys(map);
		for (let ix = 0; ix < mapKeys.length; ix++) {
			out.push({ taskID: mapKeys[ix], duration: map[mapKeys[ix]] });
		}
		return out;
	}

	function flattenMapIntoArray(keyPropName, map) {
		const mapKeys = Object.keys(map);
		let outArray = [];
		for (let ix = 0; ix < mapKeys.length; ix++) {
			let obj = {};
			obj[keyPropName] = mapKeys[ix];
			obj = { ...obj, dayArray: [...map[mapKeys[ix]]] };
			outArray.push(obj);
		}
		return outArray;
	}

	onMount(() => {
		getDailyBreakdownArray();
		getDailyNaNAppendedBreakdownArray(dailyBreakdownArray);

		const dailyNaNAppendedBreakdownArrayKeys = Object.keys(dailyNaNAppendedBreakdownArray);
		for (let ix = 0; ix < dailyNaNAppendedBreakdownArrayKeys.length; ix++) {
			flatennedDailyNaNAppendedBreakdownArray[dailyNaNAppendedBreakdownArrayKeys[ix]] =
				flattenDailyNaNAppendedBreakdownArray(
					dailyNaNAppendedBreakdownArray[dailyNaNAppendedBreakdownArrayKeys[ix]]
				);
		}
		// for (let ix = 0; ix < taskIDMonthPairs.length; ix++) {
		// 	const monthTotal = heatmapData
		// 		.filter(
		// 			(elm) =>
		// 				elm.letter === taskIDMonthPairs[ix].taskID && elm.month === taskIDMonthPairs[ix].month
		// 		)
		// 		.reduce((acc, cv) => parseFloat(acc) + parseFloat(cv.value), 0);
		// 	data.push({
		// 		letter: taskIDMonthPairs[ix].taskID,
		// 		value: monthTotal.toFixed(2),
		// 		month: taskIDMonthPairs[ix].month
		// 	});
		// }

		// const c = document.getElementById('map');
		// console.log(data);
		// try {
		// 	new HeatmapChart(c, { data, options });
		// } catch (e) {
		// 	console.log(e);
		// }
	});

	function computeDayilyAverage(dataMember) {
		const avg = (
			durationTotalsByTask[dataMember.id] /
			daysInSelectedTimeframe /
			1000 /
			60 /
			60
		).toFixed(2);

		if (isNaN(avg) === true) {
			return '-';
		} else {
			return `${avg}h`;
		}
	}

	function parseTotalDuration(dataMember) {
		const durationTotal = (durationTotalsByTask[dataMember.id] / 1000 / 60 / 60).toFixed(2);
		if (isNaN(durationTotal) === true) {
			return '-';
		} else {
			return `${durationTotal}h`;
		}
	}

	function parseDayDuration(duration) {
		if (isNaN(duration) === true) {
			return '-';
		} else {
			return `${(duration / 1000 / 60 / 60).toFixed(2)}h`;
		}
	}

	$: dailyViewsDisplayArray = flattenMapIntoArray(
		'date',
		flatennedDailyNaNAppendedBreakdownArray
	).sort((a, b) => {
		return a.date.localeCompare(b.date, undefined, { numeric: true, sensitivity: 'base' });
	});

	function syncSelectedDataMembersWithDisplayArray(dailyViewsDisplayArray) {
		let syncedDailyViewDisplayArray = [];
		for (let ix = 0; ix < dailyViewsDisplayArray.length; ix++) {
			let dayArray = dailyViewsDisplayArray[ix].dayArray;
			dayArray.sort((a, b) => {
				return a.taskID.localeCompare(b.taskID, undefined, { numeric: true, sensitivity: 'base' });
			});
			syncedDailyViewDisplayArray.push(dailyViewsDisplayArray[ix]).dayArray;
		}

		dataMemberNames.sort((a, b) => {
			return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
		});
		dailyViewsDisplayArray = syncedDailyViewDisplayArray;
	}

	$: syncSelectedDataMembersWithDisplayArray(dailyViewsDisplayArray);
	$: chunkedDailyViewsDisplayArray = chunkArray(15, dailyViewsDisplayArray);

	function validateArr(array) {
		if (array !== undefined) {
			return array;
		} else {
			return [];
		}
	}
</script>

{#if displayMode === 'data'}
	<!--box used as line-->
	<Box
		transitions={getTransition(1)}
		figmaImport={{ mobile: { top: 114, left: 119, width: 1, height: 25 } }}
		backgroundColor={$globalStyle.activeColor}
	/>
	<Label
		transitions={getTransition(1)}
		verticalFont={$globalStyle.smallMobileFont}
		figmaImport={{ mobile: { top: 114, left: 12, width: 102, height: 25 } }}
		text="{getDisplayDateFromUnix(
			$dataExplorerParams.timeframe.startUnix
		)} - {getDisplayDateFromUnix($dataExplorerParams.timeframe.endUnix)}"
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Button
		align="left"
		alignPadding="2%"
		transitions={getTransition(2)}
		verticalFont={$globalStyle.smallMobileFont}
		figmaImport={{ mobile: { top: 147, left: 12, width: 102, height: 25 } }}
		label={selectedAvgTypeToLabel[selectedAverageType]}
		onClick={() => {
			switch (selectedAverageType) {
				case 'duration':
					selectedAverageType = 'startTime';
					break;
				case 'startTime':
					selectedAverageType = 'endTime';
					break;
				case 'endTime':
					selectedAverageType = 'duration';
					break;
				default:
					selectedAverageType = 'startTime';
					break;
			}
		}}
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<!--box used as line-->
	<Box
		transitions={getTransition(2)}
		figmaImport={{ mobile: { top: 147, left: 119, width: 1, height: 25 } }}
		backgroundColor={$globalStyle.activeColor}
	/>
	<Label
		align="left"
		alignPadding="2%"
		transitions={getTransition(3)}
		verticalFont={$globalStyle.smallMobileFont}
		figmaImport={{ mobile: { top: 180, left: 12, width: 102, height: 25 } }}
		text="Totals"
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Box
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 180, left: 119, width: 1, height: 25 } }}
		backgroundColor={$globalStyle.activeColor}
	/>
	<List
		onScroll={(e) => {
			globalScrollLeft = e.target.scrollLeft;
		}}
		on:thisDOM={(e) => {
			listDOMs = [...listDOMs, e.detail];
		}}
		direction="row"
		figmaImport={{ mobile: { top: 114, left: 126, width: 222, height: 25 } }}
	>
		{#each dataMemberNames as dataMember, ix}
			<ListItem
				transitions={getTransition(ix)}
				width="40%"
				height="100%"
				style="margin-right: 2%; min-width: 40%;"
			>
				<Label
					text={dataMember.name}
					width="100%"
					height="100%"
					style="padding: 5%;"
					verticalFont={$globalStyle.smallMobileFont}
					backgroundColor="{ix % 2 === 0
						? $globalStyle.activeColor
						: $globalStyle.activeLightColor}20"
				/>
			</ListItem>
		{/each}
	</List>
	<List
		onScroll={(e) => {
			globalScrollLeft = e.target.scrollLeft;
		}}
		on:thisDOM={(e) => {
			listDOMs = [...listDOMs, e.detail];
		}}
		direction="row"
		figmaImport={{ mobile: { top: 147, left: 126, width: 222, height: 25 } }}
	>
		{#each dataMemberNames as dataMember, ix}
			<ListItem
				transitions={getTransition(ix)}
				width="40%"
				height="100%"
				style="margin-right: 2%; min-width: 40%;"
			>
				<Label
					text={getAvgValueFromType(dataMember, ix, selectedAverageType)}
					width="100%"
					height="100%"
					style="padding: 5%;"
					verticalFont={$globalStyle.smallMobileFont}
					backgroundColor="{ix % 2 === 0
						? $globalStyle.activeColor
						: $globalStyle.activeLightColor}20"
				/>
			</ListItem>
		{/each}
	</List>
	<List
		onScroll={(e) => {
			globalScrollLeft = e.target.scrollLeft;
		}}
		on:thisDOM={(e) => {
			listDOMs = [...listDOMs, e.detail];
		}}
		direction="row"
		figmaImport={{ mobile: { top: 180, left: 126, width: 222, height: 25 } }}
	>
		{#each dataMemberNames as dataMember, ix}
			<ListItem
				transitions={getTransition(ix)}
				width="40%"
				height="100%"
				style="margin-right: 2%; min-width: 40%;"
			>
				<Label
					text={parseTotalDuration(dataMember)}
					width="100%"
					height="100%"
					style="padding: 5%;"
					verticalFont={$globalStyle.smallMobileFont}
					backgroundColor="{ix % 2 === 0
						? $globalStyle.activeColor
						: $globalStyle.activeLightColor}20"
				/>
			</ListItem>
		{/each}
	</List>
	<HorizontalLine
		figmaImport={{ mobile: { top: 213, left: 12, width: 336 } }}
		style="height: 0.1vh; border-radius: {$globalStyle.borderRadius};"
		color={$globalStyle.activeColor}
	/>

	<div id="map" />

	<List figmaImport={{ mobile: { top: 221, left: 12, width: 336, height: 315 } }}>
		{#each validateArr(chunkedDailyViewsDisplayArray[dailyStatsViewCurrentChunkIndex]) as dayStats, ix}
			<ListItem
				transitions={getTransition(ix + 1)}
				style="min-height: 7%; max-height: 7%;"
				marginBottom="3%"
				width="100%"
				height="10%"
			>
				<Label
					left="0%"
					width="30%"
					height="100%"
					backgroundColor="{$globalStyle.activeColor}20"
					text={dayStats.date}
					verticalFont={$globalStyle.smallMobileFont}
				/>
				<VerticalLine
					left="32%"
					style="width: 0.1vh; border-radius: {$globalStyle.borderRadius};"
					color={$globalStyle.activeColor}
				/>
				<List
					onScroll={(e) => {
						globalScrollLeft = e.target.scrollLeft;
					}}
					on:thisDOM={(e) => {
						listDOMs = [...listDOMs, e.detail];
					}}
					direction="row"
					width="66%"
					height="100%"
					left="34%"
				>
					{#each dayStats.dayArray as day, ix}
						<ListItem
							transitions={getTransition(ix)}
							width="40%"
							height="100%"
							style="margin-right: 2%; min-width: 40%;"
						>
							<Label
								text={parseDayDuration(day.duration)}
								width="100%"
								height="100%"
								style="padding: 5%;"
								verticalFont={$globalStyle.smallMobileFont}
								backgroundColor="{ix % 2 === 0
									? $globalStyle.activeColor
									: $globalStyle.activeLightColor}20"
							/>
						</ListItem>
					{/each}
				</List>
			</ListItem>
		{/each}
	</List>

	<Label
		transitions={{ in: { func: fly, options: { duration: 200, y: '35%' } } }}
		verticalFont={$globalStyle.mediumMobileFont}
		text="{dailyStatsViewCurrentChunkIndex + 1}/{chunkedDailyViewsDisplayArray.length}"
		figmaImport={{ mobile: { top: 547, width: 106, height: 31, left: 127 } }}
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Button
		onClick={() => {
			if (dailyStatsViewCurrentChunkIndex > 0) {
				dailyStatsViewCurrentChunkIndex--;
			}
		}}
		transitions={{ in: { func: fly, options: { duration: 200, x: '35%' } } }}
		verticalFont={$globalStyle.mediumMobileFont}
		figmaImport={{ mobile: { top: 547, width: 107, height: 31, left: 12 } }}
		isSelected={dailyStatsViewCurrentChunkIndex > 0}
		backgroundColor="{$globalStyle.activeColor}20"><DropdownDeco width="80%" height="70%" /></Button
	>
	<Button
		onClick={() => {
			if (dailyStatsViewCurrentChunkIndex < chunkedDailyViewsDisplayArray.length - 1) {
				dailyStatsViewCurrentChunkIndex++;
			}
		}}
		transitions={{ in: { func: fly, options: { duration: 200, x: '-35%' } } }}
		verticalFont={$globalStyle.mediumMobileFont}
		figmaImport={{ mobile: { top: 547, width: 107, height: 31, left: 241 } }}
		backgroundColor="{$globalStyle.activeColor}20"
		isSelected={dailyStatsViewCurrentChunkIndex < chunkedDailyViewsDisplayArray.length - 1}
		><DropdownDeco width="80%" height="70%" style="transform: rotate(180deg);" /></Button
	>
{/if}

{#if displayMode === 'charts'}
	<ExplorerCharts
		dataMembers={dataMemberNames}
		{dailyViewsDisplayArray}
		dailyBreakdownMap={dailyBreakdownArray}
	/>
{/if}

<Button
	onClick={() => {
		if (displayMode === 'data') {
			displayMode = 'charts';
		} else {
			displayMode = 'data';
		}
	}}
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, x: '-25%' }
		}
	}}
	figmaImport={{ mobile: { top: 589, left: 185, width: 163, height: 44 } }}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	label={displayMode === 'data' ? 'Charts' : 'Data'}
/>

<div id="dailyChartContainer" />
