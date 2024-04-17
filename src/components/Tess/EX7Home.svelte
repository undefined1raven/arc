<script>
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import Ex7Deco from '../deco/EX7Deco.svelte';
	import HeatmapDeco from '../deco/HeatmapDeco.svelte';
	import { activeTessApp } from './activeTessApp';
	import { currentDay, logs, selectedDayObj, statusArray, moodsArray } from './TessVault';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { activeApp } from '../../stores/activeApp';
	import CircleDeco from '../deco/CircleDeco.svelte';
	import RangeScaler from '../../fn/rangeScaler';
	import { onMount } from 'svelte';
	import '@carbon/charts/styles.css';
	import { HeatmapChart } from '@carbon/charts-svelte';
	import { ex7heatmapOptions } from '../DataExplorer/explorerChartOptions';
	import { datePadding } from '../../fn/datePadding';
	let t = 150;
	let isShowingHeatmap = false;
	onMount(() => {
		moodsArray.set([
			{ title: 'Stable High', color: '#00FF75', score: 70, id: 'MD-0' },
			{ title: 'High Burst', color: '#0094FF', score: 10, id: 'MD-2' },
			{ title: 'Low', color: '#CD5057', score: -50, id: 'MD-1' },
			{ title: 'Bottom Low', color: '#7D0F15', score: -80, id: 'MD-4' },
			{ title: 'ECOR', color: '#2515DE', score: -100, id: 'MD-3' },
			{ title: 'Neutral', color: '#759A86', score: 0, id: 'MD-5' }
		]);
		setInterval(() => {
			if (t > 2) {
				t = -2;
			}
		}, 150);
	});
	function percentOfCompletedFunctionsToColors(percentage) {
		if (percentage < 25) {
			return $globalStyle.errorColor;
		} else if (percentage >= 25 && percentage < 75) {
			return '#FFFF00';
		} else if (percentage >= 75) {
			return $globalStyle.successColor;
		}
	}

	function getDisplayDate(unixTimestamp) {
		const date = new Date(unixTimestamp);
		return (
			date.toLocaleString('default', {
				day: 'numeric',
				month: 'short'
			}) +
			' | ' +
			date.getFullYear()
		);
	}

	let heatmapDataArray = [];
	let monthsInData = {}; /// short format: Jun

	function appendDayStatusToLogs(logs) {
		let out = [];
		heatmapDataArray = [];
		for (let ix = 0; ix < logs.length; ix++) {
			const tasks = logs[ix].tasks;
			let completedTasks = 0;

			for (let iix = 0; iix < tasks.length; iix++) {
				const taskStatus = $statusArray.find((elm) => elm.id === tasks[iix].statusID);
				if (taskStatus?.name === ('Completed' || 'completed' || 'Done' || 'done')) {
					completedTasks++;
				}
				if (taskStatus?.name.toLocaleLowerCase() === 'incomplete') {
					completedTasks += 0.5;
				}
			}
			const completedTasksPercentage = parseFloat(
				((completedTasks * 100) / tasks.length).toFixed(1)
			);
			const dayDate = new Date(logs[ix].tx);
			const dayLongMonth = dayDate.toLocaleDateString('default', { month: 'short' });
			const dayNumericMonth = dayDate.toLocaleDateString('default', { month: 'numeric' });
			const day = dayDate.toLocaleDateString('default', { day: '2-digit' });
			const numericYear = dayDate.toLocaleDateString('default', { year: 'numeric' });
			monthsInData[dayLongMonth] = { numericMonth: dayNumericMonth, numericYear: numericYear };
			heatmapDataArray.push({ value: 100, month: 'Nov', day: '01' });
			heatmapDataArray.push({
				value: completedTasksPercentage,
				month: dayLongMonth,
				day: day,
				numericMonth: dayNumericMonth,
				numericYear
			});
			out.push({ ...logs[ix], completedTasksPercentage });
		}
		appendHeatmapDataWithTheEmptyDays(heatmapDataArray);
		return out.reverse();
	}

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	let appendedHeatmap = [];
	function appendHeatmapDataWithTheEmptyDays(heatmapDataArray) {
		const monthKeys = Object.keys(monthsInData);
		for (let ix = 0; ix < monthKeys.length; ix++) {
			const month = monthsInData[monthKeys[ix]];
			const dayCountInMonth = daysInMonth(month.numericMonth, month.numericYear);
			for (let di = 1; di < dayCountInMonth + 1; di++) {
				const existingDay = heatmapDataArray.find(
					(elm) => elm.numericMonth === month.numericMonth && elm.day === datePadding(di).toString()
				);
				if (existingDay !== undefined) {
					appendedHeatmap.push(existingDay);
				} else {
					appendedHeatmap.push({
						value: null,
						month: new Date(2024, month.numericMonth, 0).toLocaleDateString('default', {
							month: 'short'
						}),
						day: datePadding(di)
					});
				}
			}
		}
	}

	$: appendHeatmapDataWithTheEmptyDays(heatmapDataArray);
	$: appendedDayStatusLogs = appendDayStatusToLogs($logs);
</script>

<Box
	horizontalCenter={true}
	transitions={getTransition(1)}
	backgroundColor="{$globalStyle.activeColor}20"
	figmaImport={{ mobile: { top: 30, left: '50%', width: 350, height: 53 } }}
	><Label text="EX7 Logger" left="2%" /><Ex7Deco style="right: 2%;" height="80%" width="20%" /></Box
>
<Button
	onClick={() => {
		window.location.hash = 'EX7currentDay';
		if ($currentDay.active === false) {
			currentDay.set({
				tx: Date.now(),
				tasks: [],
				exfArray: [],
				active: true,
				moodLogs: [],
				L5s: {
					L0: { x: 0, y: 0, color: '#959595' },
					L1: { x: 0, y: 0, color: '#608DFF' },
					L2: { x: 0, y: 0, color: '#1400FF' },
					L3: { x: 0, y: 0, color: '#712EFF' },
					L4: { x: 0, y: 0, color: '#BD00FF' },
					none: { x: 0, y: 0 }
				}
			});
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	horizontalCenter={true}
	label={$currentDay.active ? 'View Current Day' : 'New Day'}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 97, left: '50%', width: 350, height: 53 } }}
/>
<Label
	text="Logs"
	transitions={getTransition(3)}
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	style="justify-content: start; text-align: start; padding-left: 2%;"
	figmaImport={{ mobile: { top: 164, left: 5, width: 350, height: 38 } }}
/>
<Button
	onClick={() => {
		isShowingHeatmap = !isShowingHeatmap;
	}}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 167, left: 215, width: 134, height: 33 } }}
	hoverOpacityMin={0}
	hoverOpacityMax={0}
>
	<HeatmapDeco width="20%" style="right: 5%;" height="80%" color={$globalStyle.activeColor} />
	<Label
		text={isShowingHeatmap ? 'List' : 'Heatmap'}
		verticalFont={$globalStyle.mediumMobileFont}
		left="5%"
	/>
</Button>
{#if isShowingHeatmap === false}
	<Box
		style="border-bottom: solid 1px {$globalStyle.activeColor}; border-top: solid {$logs.length > 0
			? '0px'
			: '1px'} {$globalStyle.activeColor};"
		figmaImport={{ mobile: { top: 207, left: 5, width: 350, height: 353 } }}
		transitions={getTransition(4)}
	>
		<List width="100%" height="100%">
			{#if $logs.length === 0}
				<Label
					backgroundColor="{$globalStyle.activeColor}20"
					borderRadius={$globalStyle.borderRadius}
					text="No logs to view"
					top="20%"
					width="80%"
					height="15%"
				/>
			{/if}
			{#each appendedDayStatusLogs as log, ix}
				<ListItem
					style="min-height: 13%;"
					marginBottom="4%"
					marginTop="0%"
					width="100%"
					height="13%"
				>
					<Label
						text="{log.completedTasksPercentage}% completed"
						color={percentOfCompletedFunctionsToColors(log.completedTasksPercentage)}
						backgroundColor="{percentOfCompletedFunctionsToColors(log.completedTasksPercentage)}10"
						width="55%"
						height="60%"
						align="left"
						alignPadding="2%"
						verticalFont={$globalStyle.mediumMobileFont}
						style="right: 2%;"
					/>
					<CircleDeco
						width="3vh"
						height="3vh"
						left="87%"
						color="{percentOfCompletedFunctionsToColors(log.completedTasksPercentage)}50"
					/>
					<CircleDeco
						width="3vh"
						height="3vh"
						left="87%"
						strokeDasharray={'300%'}
						style="transition: stroke-dashoffset ease-out 4s;"
						strokeDashOffset="{RangeScaler(log.completedTasksPercentage, 0, 100, 300, 0) + t}%"
						color={percentOfCompletedFunctionsToColors(log.completedTasksPercentage)}
					/>
					<Button
						onClick={() => {
							selectedDayObj.set({ ...log, ini: true, ix: ix });
							window.location.hash = 'dayView';
						}}
						hoverOpacityMin={0}
						hoverOpacityMax={20}
						width="100%"
						height="100%"
						style="justify-content: start; text-align: start; padding-left: 2%;"
						label={getDisplayDate(log.tx)}
					/>
				</ListItem>
			{/each}
		</List>
	</Box>
{/if}

{#if isShowingHeatmap === true}
	<Box
		style="overflow: hidden;"
		width="95%"
		height="50%"
		figmaImport={{ mobile: { top: 207, left: 5, width: 350, height: 353 } }}
		transitions={getTransition(2)}
	>
		<HeatmapChart data={appendedHeatmap} options={ex7heatmapOptions} />
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
	label="Back"
	onClick={() => {
		// activeTessApp.set('menu');
		activeApp.set('menu');
	}}
	figmaImport={{ mobile: { top: 574, width: 350, left: 5, height: 44 } }}
/>

<style>
	:global(text) {
		fill: var(--activeMono);
	}
	:global(.cds--cc--axes g.axis g.tick text) {
		fill: var(--activeMono);
	}
</style>
