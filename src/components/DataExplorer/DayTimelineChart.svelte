<script lang="ts">
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import timePadding from '../../fn/timePadding';
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
	import { HeatmapChart, DonutChart, SimpleBarChart, StackedBarChart } from '@carbon/charts';
	import { dayHourConstant } from './DayTimelineChartHourConstant.js';
	import { fly } from 'svelte/transition';
	import {
		donutBaseOptions,
		horizontalFloatingBarBaseOptions,
		horizontalStackedBarBaseOptions
	} from './explorerChartOptions';

	const dayMillis = 1000 * 60 * 60 * 24;

	let chunks = []; ///{name, chunkHeight, chunkTop, color}

	const hourConstant = $dayHourConstant;
	let chartTotalHeight = $dayHourConstant * 24;

	let hourChunksArray = [];
	let hoursLabels = [];

	onMount(() => {
		for (let ix = 0; ix < 24; ix++) {
			hourChunksArray.push(ix);
			const hourLabelTop = ((ix * 1000 * 60 * 60 * 100) / dayMillis).toFixed(3);
			hoursLabels.push({ label: `${timePadding(ix)}:00`, top: hourLabelTop });
		}
		const nextMidnightHourLabelTop = ((24 * 1000 * 60 * 60 * 100) / dayMillis).toFixed(3);
		hoursLabels.push({ label: `${timePadding(0)}:00`, top: nextMidnightHourLabelTop - 0.7 });
	});

	const containerConfig = { containerHeight: 302, containerWidth: 336 };
	export { hourConstant, chunks };
</script>

<Box
	style="overflow: hidden;"
	figmaImportConfig={containerConfig}
	figmaImport={{ mobile: { top: '0', left: '0', width: '100%', height: chartTotalHeight } }}
	><Box width="20%" height="100%" backgroundColor="{$globalStyle.activeColor}20">
		{#each hourChunksArray as ix}
			<Box height="0.11vh" width="100%" backgroundColor="#000000" top="{ix * 4.166666667}%" />
		{/each}
		{#each chunks as chunk}
			<Box
				width="100%"
				height="{chunk.chunkHeight}%"
				top="{chunk.chunkTop}%"
				backgroundColor="{chunk.color}50"
			/>
		{/each}
	</Box>
	{#each hoursLabels as hourLabel}
		<Label
			left="63%"
			style="border-right: solid 1px {$globalStyle.activeMono}; padding-right: 2%"
			borderRadius="0"
			verticalFont={$globalStyle.smallMobileFont}
			text={hourLabel.label}
			top="{hourLabel.top}%"
		/>
	{/each}

	{#each chunks as chunk}
		<Box left="0%" width="37%" height="{chunk.chunkHeight}%" top="{chunk.chunkTop}%">
			<Box left="100%" width="0.8%" height="100%" top="0%" backgroundColor="{chunk.color}50" />
			<Label
				align="right"
				left="-4%"
				height="100%"
				width="100%"
				verticalFont={$globalStyle.smallMobileFont}
				text={chunk.name}
				color={chunk.color}
			/>
			<!-- {#if chunk.chunkHeight > 0.0004 * chartTotalHeight}
				<Label
					align="right"
					left="104%"
					style="border-right: solid 1px {chunk.color}; padding-right: 4%;"
					borderRadius="0"
					width="100%"
					top="0%"
					verticalFont={$globalStyle.smallMobileFont}
					text={chunk.taskStartTimeLabel}
					color={chunk.color}
				/>
				<Label
					align="right"
					left="104%"
					style="border-right: solid 1px {chunk.color}; padding-right: 4%;"
					borderRadius="0"
					width="100%"
					top="100%"
					verticalCenter={true}
					verticalFont={$globalStyle.smallMobileFont}
					text={chunk.taskEndTimeLabel}
					color={chunk.color}
				/>
			{/if} -->
		</Box>
	{/each}
</Box>
