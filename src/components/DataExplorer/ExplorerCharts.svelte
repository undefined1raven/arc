<script lang="ts">
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import List from '../common/List.svelte';
	import DateInput from '../common/DateInput.svelte';
	import DropdownDeco from '../deco/DropdownDeco.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { dataExplorerParams } from './dataExplorerParams';
	import { onDestroy, onMount } from 'svelte';
	import getDateFromUnix from '../../fn/getDateFromUnix';
	import getRandomInt from '../../fn/getRandomInt';
	import '@carbon/charts/styles.css';
	import { HeatmapChart, DonutChart, SimpleBarChart } from '@carbon/charts';
	import { fly } from 'svelte/transition';
	import { donutBaseOptions, horizontalFloatingBarBaseOptions } from './explorerChartOptions';

	const dayMillis = 1000 * 60 * 60 * 24;

	function getDisplayDateFromUnix(unix) {
		const date = new Date(unix);
		return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
	}

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

	// const options = {
	// 	title: 'Heatmap',
	// 	axes: {
	// 		bottom: {
	// 			title: 'Letters',
	// 			mapsTo: 'letter',
	// 			scaleType: 'labels'
	// 		},
	// 		left: {
	// 			title: 'Months',
	// 			mapsTo: 'month',
	// 			scaleType: 'labels'
	// 		}
	// 	},
	// 	heatmap: {
	// 		colorLegend: {
	// 			title: 'Legend title'
	// 		}
	// 	},
	// 	experimental: true,
	// 	height: '400px'
	// };

	let dataMembers = []; /// {id, name, active, color}
	let dailyViewsDisplayArray = [];
	let dailyViewMode = 'breakdown'; // breakdown | timeline
	let listDOMs = [];
	let dailyBreakdownMap = {};
	let globalScrollLeft = 0;

	function onGlobalScrollLeftChange(globalScrollLeft) {
		///sync scrollLeft across all lists
		for (let ix = 0; ix < listDOMs.length; ix++) {
			if (listDOMs[ix].scrollLeft !== undefined) {
				listDOMs[ix].scrollLeft = globalScrollLeft;
			}
		}
	}

	function dailyCompositionChartDataChange(dailyCompositionChartData) {
		dailyCompChart?.model?.setData(dailyCompositionChartData);
	}

	function dayTimelineChartDataChange(dayTimelineChartData) {
		dayTimelineChart?.model?.setData(dayTimelineChartData);
	}

	function onDayViewModeChange(dayViewMode) {
		setTimeout(() => {
			if (dayViewMode === 'breakdown') {
				let chartHolder = document.getElementById('dailyChartContainer');
				dailyCompChart = new DonutChart(chartHolder, {
					data: dailyCompositionChartData,
					options: {
						...donutBaseOptions,
						color: { scale: dailyCompositionChartColorsMap },
						title: 'Day Breakdown',
						donut: { center: { label: 'Millis' } }
					}
				});
			} else {
				let chartHolder = document.getElementById('dayTimelineChartContainer');
				dayTimelineChart = new SimpleBarChart(chartHolder, {
					data: dayTimelineChartData,
					options: {
						...horizontalFloatingBarBaseOptions,
						color: { scale: dailyCompositionChartColorsMap },
						title: 'Day Timeline',
						donut: { center: { label: 'Millis' } }
					}
				});
			}
		}, 20);
	}

	$: dailyCompositionChartDataChange(dailyCompositionChartData);

	$: dayTimelineChartDataChange(dayTimelineChartData);

	$: onGlobalScrollLeftChange(globalScrollLeft);

	let selectedDayForPlottingUnix = $dataExplorerParams.timeframe.endUnix - 1000 * 60 * 60 * 24;

	$: dailyCompositionChartData = dayArrayToDailyCompositionChartData(
		selectedDayForPlottingUnix,
		dataMembers
	);

	$: dayTimelineChartData = dayArrayToDayTimelineChartData(selectedDayForPlottingUnix, dataMembers);

	$: dailyCompositionChartColorsMap = dataMembersToChartColorMap(dataMembers);
	let dailyCompChart;
	let dayTimelineChart;
	$: onDayViewModeChange(dailyViewMode);

	onMount(() => {
		setTimeout(() => {
			for (let ix = 0; ix < dataMembers.length; ix++) {
				if (ix >= chartColors.length) {
					dataMembers[ix].color = `rgba(${getRandomInt(50, 255)}, ${getRandomInt(
						50,
						255
					)}, ${getRandomInt(50, 255)}, 1);`;
				} else {
					dataMembers[ix].color = chartColors[ix];
				}
				dataMembers[ix].active = true;
			}
		}, 20);
	});

	function dayArrayToDailyCompositionChartData(dayUnix, dataMembers) {
		let out = [];
		let date = getDateFromUnix(dayUnix);
		const dayArray = dailyViewsDisplayArray.find((elm) => elm.date === date)?.dayArray;
		if (dayArray != undefined && dayArray.length) {
			for (let ix = 0; ix < dayArray.length; ix++) {
				const task = dayArray[ix];
				const dataMember = dataMembers.find((elm) => elm.id === task.taskID);
				if (dataMember.active === true) {
					out.push({
						active: dataMember.active,
						group: dataMember.name,
						value: isNaN(task.duration) ? 0 : task.duration
					});
				}
			}
		} else {
			throw new Error('Day Data Not Found');
		}
		return out;
	}

	function dayArrayToDayTimelineChartData(dayUnix, dataMembers) {
		let out = [];
		const selectedDayArray = dailyBreakdownMap[getDateFromUnix(dayUnix)];
		for (let ix = 0; ix < selectedDayArray.length; ix++) {
			const task = selectedDayArray[ix];
			const dataMember = dataMembers.find((elm) => elm.id === task.taskID);
			const ISODate = new Date(task.taskStartUnix).toISOString();
			if (dataMember.active === true) {
				out.push({
					group: dataMember.name,
					date: ISODate,
					value: task.taskEndUnix - task.taskStartUnix,
					endDate: task.taskEndUnix
				});
			}
		}

		return out;
	}

	function dataMembersToChartColorMap(dataMembers) {
		let out = {};
		for (let ix = 0; ix < dataMembers.length; ix++) {
			const dataMember = dataMembers[ix];
			if (dataMember.active === true) {
				out[dataMember.name] = dataMember.color;
			}
		}
		return out;
	}

	function checkIfUnixIsWihthinSelectedRange(unix) {
		const date = getDateFromUnix(unix);
		return dailyViewsDisplayArray.find((elm) => elm.date === date) !== undefined;
	}

	$: console.log(dayTimelineChartData);

	export { dataMembers, dailyViewsDisplayArray, dailyBreakdownMap };
</script>

<Label
	align="left"
	alignPadding="2%"
	transitions={getTransition(1)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 114, left: 12, width: 102, height: 25 } }}
	text="{getDisplayDateFromUnix($dataExplorerParams.timeframe.startUnix)} - {getDisplayDateFromUnix(
		$dataExplorerParams.timeframe.endUnix
	)}"
	backgroundColor="{$globalStyle.activeColor}20"
/>

<Label
	align="left"
	alignPadding="2%"
	transitions={getTransition(2)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 147, left: 12, width: 102, height: 25 } }}
	text="Selector"
	backgroundColor="{$globalStyle.activeColor}20"
/>
<Box
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 147, left: 119, width: 1, height: 25 } }}
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
	figmaImport={{ mobile: { top: 147, left: 126, width: 222, height: 25 } }}
>
	{#each dataMembers as dataMember, ix}
		<ListItem
			transitions={getTransition(ix)}
			width="40%"
			height="100%"
			style="margin-right: 2%; min-width: 40%;"
		>
			<Button
				onClick={() => {
					dataMembers[ix].active = !dataMember.active;
				}}
				color={dataMember.active ? dataMember.color : $globalStyle.inactiveColor}
				borderColor={dataMember.active ? dataMember.color : $globalStyle.inactiveColor}
				label={dataMember.name}
				width="100%"
				height="100%"
				style="padding: 5%;"
				verticalFont={$globalStyle.smallMobileFont}
				backgroundColor="#00000002"
			/>
		</ListItem>
	{/each}
</List>

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

<DateInput
	transitions={getTransition(4)}
	style="text-align: center;"
	borderColor={$globalStyle.activeColor}
	verticalFont={$globalStyle.mediumMobileFont}
	figmaImport={{ mobile: { top: 213, left: 93, width: 174, height: 25 } }}
	unixDefaultValue={selectedDayForPlottingUnix}
	on:onUnixValue={(e) => {
		selectedDayForPlottingUnix = e.detail;
	}}
/>
<Button
	onClick={() => {
		let newSelectedDayUnix = selectedDayForPlottingUnix - dayMillis;
		if (
			dailyViewsDisplayArray.find((elm) => elm.date === getDateFromUnix(newSelectedDayUnix)) !==
			undefined
		) {
			selectedDayForPlottingUnix = newSelectedDayUnix;
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	borderColor={checkIfUnixIsWihthinSelectedRange(selectedDayForPlottingUnix - dayMillis)
		? $globalStyle.activeColor
		: $globalStyle.inactiveColor}
	transitions={getTransition(4)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 213, left: 12, width: 79, height: 25 } }}
	><DropdownDeco
		color={checkIfUnixIsWihthinSelectedRange(selectedDayForPlottingUnix - dayMillis)
			? $globalStyle.activeColor
			: $globalStyle.inactiveColor}
		width="30%"
		height="80%"
	/></Button
>
<Button
	onClick={() => {
		let newSelectedDayUnix = selectedDayForPlottingUnix + dayMillis;
		if (
			dailyViewsDisplayArray.find((elm) => elm.date === getDateFromUnix(newSelectedDayUnix)) !==
			undefined
		) {
			selectedDayForPlottingUnix = newSelectedDayUnix;
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	borderColor={checkIfUnixIsWihthinSelectedRange(selectedDayForPlottingUnix + dayMillis)
		? $globalStyle.activeColor
		: $globalStyle.inactiveColor}
	transitions={getTransition(4)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 213, left: 269, width: 79, height: 25 } }}
	><DropdownDeco
		color={checkIfUnixIsWihthinSelectedRange(selectedDayForPlottingUnix + dayMillis)
			? $globalStyle.activeColor
			: $globalStyle.inactiveColor}
		width="30%"
		height="80%"
		style="transform: rotate(180deg);"
	/></Button
>
<Button
	style="z-index: 400;"
	onClick={() => {
		if (dailyViewMode === 'breakdown') {
			dailyViewMode = 'timeline';
		} else {
			dailyViewMode = 'breakdown';
		}
	}}
	label={dailyViewMode === 'breakdown' ? 'Switch to Timeline' : 'Switch to Breakdown'}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	horizontalCenter={true}
	transitions={getTransition(5)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 246, left: '50%', width: 129, height: 25 } }}
/>

{#if dailyViewMode === 'breakdown'}
	<Box
		style="overflow: hidden;"
		transitions={getTransition(6)}
		figmaImport={{ mobile: { top: 279, left: 12, width: 336, height: 302 } }}
	>
		<div id="dailyChartContainer" style="position: absolute; width: 100%; height: 100%:" />
	</Box>
{/if}
{#if dailyViewMode === 'timeline'}
	<Box
		style="overflow: hidden;"
		transitions={getTransition(6)}
		figmaImport={{ mobile: { top: 279, left: 12, width: 336, height: 302 } }}
	>
		<div id="dayTimelineChartContainer" style="position: absolute; width: 100%; height: 100%:" />
	</Box>
{/if}

<style>
	:global(.header) {
		padding-left: 2%;
		background-color: var(--activeMono);
		border-radius: var(--borderRadius10);
	}
</style>
