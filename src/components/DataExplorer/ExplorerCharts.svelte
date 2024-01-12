<script lang="ts">
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
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
	import getRandomInt from '../../fn/getRandomInt';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import '@carbon/charts/styles.css';
	import { HeatmapChart } from '@carbon/charts';
	import VerticalLine from '../common/VerticalLine.svelte';
	import { fly } from 'svelte/transition';
	import { donutBaseOptions } from './explorerChartOptions';
	import { DonutChart } from '@carbon/charts-svelte';

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
				if (ix < 5) {
					dataMembers[ix].active = true;
				} else {
					dataMembers[ix].active = false;
				}
			}
			const dailyChart = document.getElementById('dailyChartContainer');

			let dailyData = [
				{
					group: '2V2N 9KYPM version 1',
					value: 20000
				},
				{
					group: 'L22I P66EP L22I P66EP L22I P66EP',
					value: 65000
				},
				{
					group: 'JQAI 2M4L1',
					value: 75000
				},
				{
					group: 'J9DZ F37AP',
					value: 1200
				},
				{
					group: 'YEL48 Q6XK YEL48',
					value: 10000
				},
				{
					group: 'Misc',
					value: 25000
				}
			];
			console.log(dailyChart)
			new DonutChart(dailyChart, { data: dailyData, options: donutBaseOptions });
		}, 20);
	});

	export { dataMembers };
</script>

<Label
	align="left"
	alignPadding="2%"
	transitions={getTransition(2)}
	verticalFont={$globalStyle.smallMobileFont}
	figmaImport={{ mobile: { top: 147, left: 12, width: 102, height: 25 } }}
	text="Average"
	backgroundColor="{$globalStyle.activeColor}20"
/>
<Box
	transitions={getTransition(3)}
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
					dataMembers[ix].active = !dataMembers[ix].active;
				}}
				label={dataMember.name}
				width="100%"
				height="100%"
				color={dataMember.active ? dataMember.color : $globalStyle.inactiveMono}
				borderColor={dataMember.active ? dataMember.color : $globalStyle.inactiveColor}
				backgroundColor="#00000000"
				hoverOpacityMin={0}
				hoverOpacityMax={20}
				style="padding: 5%;"
				verticalFont={$globalStyle.smallMobileFont}
			/>
		</ListItem>
	{/each}
</List>
<Box
	id="dailyChartContainer"
	figmaImport={{ mobile: { top: 279, left: 12, width: 336, height: 302 } }}
/>
