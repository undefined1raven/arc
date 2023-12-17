<script>
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import Ex7Deco from '../deco/EX7Deco.svelte';
	import { activeTessApp } from './activeTessApp';
	import { currentDay, logs, selectedDayObj } from './TessVault';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';

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

	let selectedDayIndex = -1;
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
			currentDay.set({ tx: Date.now(), tasks: [], exfArray: [], active: true });
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
		{#each $logs as log, ix}
			<ListItem style="min-height: 13%;" marginBottom="4%" marginTop="0%" width="100%" height="13%">
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
		activeTessApp.set('menu');
	}}
	figmaImport={{ mobile: { top: 574, width: 350, left: 5, height: 44 } }}
/>
