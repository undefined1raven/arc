<script lang="ts">
	import Box from './Box.svelte';
	import Label from './Label.svelte';
	import Button from './Button.svelte';
	import globalStyle from '../../stores/globalStyles';
	import List from './List.svelte';
	import ListItem from './ListItem.svelte';
	import { fly } from 'svelte/transition';
	import Input from './Input.svelte';
	import TrashDeco from '../deco/TrashDeco.svelte';
	import { createEventDispatcher } from 'svelte';
	import ColorInput from './ColorInput.svelte';
	import { v4 } from 'uuid';
	import getRandomInt from '../../fn/getRandomInt';
	import { rgbToHex } from '../SID/fn/rgbToHex';
	import { writable } from 'svelte/store';
	import isMobile from '../../fn/isMobile';

	const dispatch = createEventDispatcher();

	let statusArray = writable([]);
	let allowPicking = true;
	let listItemHeight = isMobile() ? '8%' : '6%';
	export { statusArray, allowPicking };
</script>

<Box
	style="z-index: 55; "
	figmaImport={{
		mobile: { top: 25, width: 360, height: 600, left: '0' },
		desktop: { top: '0', left: '0', width: '100%', height: '100%' }
	}}
	backgroundColor="#000000AA"
	backdropFilter="blur(5px)"
>
	<List
		width={isMobile() ? '95%' : '30%'}
		style="overflow-y: scroll;"
		height="89%"
		top="2%"
		left="50%"
		horizontalCenter={true}
	>
		{#each $statusArray as status, ix}
			{#if status.show}
				<ListItem
					style="min-height: {listItemHeight};"
					width="100%"
					height={listItemHeight}
					marginBottom={isMobile() ? '5%' : '3%'}
					><Box
						transitions={{
							in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
						}}
						width="100%"
						height="100%"
					>
						{#if allowPicking === true}
							<Button
								onClick={() => {
									dispatch('onStatusSelected', status.id);
								}}
								label="Pick"
								color={status.color}
								backgroundColor={status.color}
								borderColor={status.color}
								width="20%"
								height="100%"
								left="0%"
								desktopFont={$globalStyle.mediumDesktopFont}
							/>
						{/if}
						<Input
							on:onValue={(e) => {
								statusArray.update((sa) => {
									let current = sa.find((elm) => elm.id === status.id);
									current['name'] = e.detail;
									sa[ix] = current;
									return sa;
								});
							}}
							borderColor={status.color}
							height="100%"
							color={status.color}
							backgroundColor={status.color}
							width={allowPicking ? '55%' : '78%'}
							left={allowPicking ? '23%' : '0%'}
							style="padding-left: 2%;"
							desktopFont={$globalStyle.mediumDesktopFont}
							defaultValue={status.name}
						/><ColorInput
							on:onValue={(e) => {
								statusArray.update((sa) => {
									let current = sa.find((elm) => elm.id === status.id);
									current['color'] = e.detail;
									sa[ix] = current;
									return sa;
								});
							}}
							style="z-index: 2; opacity: 0.005;"
							width="15%"
							height="120%"
							left="63%"
						/><Label
							backgroundColor={status.color}
							borderRadius={$globalStyle.borderRadius}
							height="100%"
							width="15%"
							left="63%"
							style="border-bottom-left-radius: 0px; border-top-left-radius: 0px;"
						/><Button
							onClick={() => {
								statusArray.update((sa) => {
									let current = sa.find((elm) => elm.id === status.id);
									current['show'] = false;
									sa[ix] = current;
									return sa;
								});
							}}
							height="100%"
							width="19%"
							style="right: 0%;"
							backgroundColor={$globalStyle.errorColor}
							borderColor={$globalStyle.errorColor}
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							><TrashDeco width="60%" height="45%" color={$globalStyle.errorColor} /></Button
						></Box
					></ListItem
				>
			{/if}
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
	desktopFont={$globalStyle.mediumDesktopFont}
	style="z-index: 60;"
	onClick={() => {
		dispatch('onBack');
	}}
	label="Back"
	horizontalCenter={isMobile() ? false : true}
	figmaImport={{
		mobile: { top: 574, left: 13, width: 160, height: 49 },
		desktop: { top: '90%', left: '41.6%', width: 250, height: 55 }
	}}
/>
<Button
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	hoverOpacityMin={0}
	desktopFont={$globalStyle.mediumDesktopFont}
	hoverOpacityMax={20}
	style="z-index: 60;"
	onClick={() => {
		statusArray.update((sa) => {
			sa.push({
				name: 'State-' + v4().split('-')[1],
				id: `STID-${v4()}`,
				color: rgbToHex(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)),
				show: true
			});
			return sa;
		});
	}}
	label="New Status"
	figmaImport={{
		mobile: { top: 574, left: 187, width: 160, height: 49 },
		desktop: { top: '90%', left: '51.8%', width: 250, height: 55 }
	}}
/>
