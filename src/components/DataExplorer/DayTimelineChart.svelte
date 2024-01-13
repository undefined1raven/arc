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
	import { HeatmapChart, DonutChart, SimpleBarChart, StackedBarChart } from '@carbon/charts';
	import { fly } from 'svelte/transition';
	import {
		donutBaseOptions,
		horizontalFloatingBarBaseOptions,
		horizontalStackedBarBaseOptions
	} from './explorerChartOptions';
	let chunks = []; ///{name, chunkHeight, chunkTop, color}
	let hourConstant = 96;
	let chartTotalHeight = 96 * 24;

	let hoursArray = [];

	onMount(() => {
		for (let ix = 0; ix < 24; ix++) {
			hoursArray.push(ix);
		}
	});
	const containerConfig = { containerHeight: 302, containerWidth: 336 };
	export { hourConstant, chunks };
</script>

<Box
	figmaImportConfig={containerConfig}
	figmaImport={{ mobile: { top: '0', left: '0', width: '100%', height: chartTotalHeight } }}
	><Box width="20%" height="100%" backgroundColor="{$globalStyle.activeColor}20">
		{#each hoursArray as ix}
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
</Box>
