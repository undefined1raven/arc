<script lang="ts">
	import Box from '../../common/Box.svelte';
	import Label from '../../common/Label.svelte';
	import Button from '../../common/Button.svelte';
	import HorizontalLine from '../../common/HorizontalLine.svelte';
	import globalStyle from '../../../stores/globalStyles';
	import { onDestroy, onMount } from 'svelte';
	import {
		currentDay,
		exfArray,
		logs,
		moodsArray,
		selectedDayObj,
		statusArray
	} from '../TessVault';
	import { tasks } from '../../../stores/dayViewSelectedDay';
	import Input from '../../common/Input.svelte';
	import { fade, fly } from 'svelte/transition';
	import { touchMove, touchStart } from '../../../stores/touchGestures';
	import screenSize from '../../../stores/screenSize';
	import Textarea from '../../common/Textarea.svelte';
	import L5sDeco from '../../deco/L5sDeco.svelte';
	import DropdownDeco from '../../deco/DropdownDeco.svelte';
	import LAttributesEditorGrid from '../../deco/LAttributesEditorGrid.svelte';
	import LAttributeRing from '../../deco/LAttributeRing.svelte';
	import { createEventDispatcher } from 'svelte';
	import { allowMenuSwipe } from '../../../stores/allowMenuSwpite';
	import DateInput from '../../common/DateInput.svelte';
	import { getTransition } from '../../../fn/getTransisitions';
	import EditDeco from '../../deco/EditDeco.svelte';
	import MoodLoggerDeco from '../../deco/MoodLoggerDeco.svelte';
	import MoodLogDeco from '../../deco/MoodLogDeco.svelte';
	import List from '../../common/List.svelte';
	import ListItem from '../../common/ListItem.svelte';
	import { getTimeFromUnix } from '../../../fn/getTimeFromUnix';
	import EflagDeco from '../../deco/EflagDeco.svelte';
	import { currentMood } from './currentMood';
	import { validateInput } from '../../../fn/validateInput';
	const dispatch = createEventDispatcher();

	let isEditingNote = false;
	let isPickingMood = false;
	const moodListItemConfig = { containerHeight: 559, containerWidth: 350 };
	const moodListItemContentConfig = { containerHeight: 53, containerWidth: 350 };

	function getCurrentMoodTitle() {
		if ($currentMood === null) {
			return '--';
		} else {
			return $moodsArray.find((elm) => elm.id === $currentMood.id)?.title;
		}
	}
	$: currentMoodTitle = getCurrentMoodTitle($currentMood);
	$: panelTop = isEditingNote ? 303 : 491;
	const panelContainerConfig = { containerHeight: 329, containerWidth: 350 };
</script>

<Box
	style="transition: all linear 0.1s;"
	backdropFilter="blur({isEditingNote ? '30px' : '0px'})"
	horizontalCenter={true}
	figmaImport={{
		mobile: {
			top: panelTop,
			left: '50%',
			width: panelContainerConfig.containerWidth,
			height: panelContainerConfig.containerHeight
		}
	}}
>
	<Box
		figmaImportConfig={panelContainerConfig}
		backgroundColor="{$globalStyle.activeColor}10"
		horizontalCenter={true}
		figmaImport={{ mobile: { top: '0', left: '50%', width: '100%', height: 144 } }}
	/>
	{#if $currentMood === null}
		<Button
			transitions={getTransition(1)}
			onClick={() => {
				isPickingMood = true;
			}}
			horizontalCenter={true}
			figmaImportConfig={panelContainerConfig}
			figmaImport={{ mobile: { top: 48, left: '50%', width: 228, height: 47 } }}
			label="Pick a mood"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
		/>
	{:else}
		<Button
			onClick={() => {
				currentMood.update((cm) => {
					cm.eflag = !cm.eflag;
					return cm;
				});
			}}
			transitions={getTransition(1)}
			figmaImportConfig={panelContainerConfig}
			figmaImport={{ mobile: { top: 5, left: 179, width: 70, height: 29 } }}
			hoverOpacityMin={$currentMood.eflag ? 60 : 0}
			hoverOpacityMax={$currentMood.eflag ? 60 : 10}><EflagDeco height="70%" /></Button
		>
		<Button
			onClick={() => {
				isEditingNote = !isEditingNote;
			}}
			transitions={getTransition(1)}
			figmaImportConfig={panelContainerConfig}
			figmaImport={{ mobile: { top: 5, left: 256, width: 87, height: 29 } }}
			hoverOpacityMin={0}
			label="Note"
			align="left"
			verticalFont={$globalStyle.mediumMobileFont}
			alignPadding="2%"
			hoverOpacityMax={20}
			><DropdownDeco
				style="right: 2%; transform: rotate({isEditingNote ? '-90deg' : '90deg'});"
				height="70%"
			/></Button
		>
		<Label
			transitions={getTransition(1)}
			text={currentMoodTitle}
			figmaImportConfig={panelContainerConfig}
			figmaImport={{ mobile: { top: 11, left: 6 } }}
			verticalFont="20px"
		/>
		<HorizontalLine
			transitions={getTransition(2)}
			figmaImportConfig={panelContainerConfig}
			width="100%"
			color={$globalStyle.activeColor}
			style="height: 0.11vh;"
			figmaImport={{ mobile: { top: 43, left: '0', width: '100%' } }}
		/>
		<Label
			backgroundColor="{$globalStyle.activeColor}10"
			transitions={getTransition(3)}
			text="Started at {getTimeFromUnix($currentMood?.startUnix)}"
			figmaImportConfig={panelContainerConfig}
			horizontalCenter={true}
			figmaImport={{ mobile: { top: 57, left: '50%', width: 204, height: 22 } }}
			verticalFont={$globalStyle.mediumMobileFont}
		/>
		<Button
			onClick={() => {
				if ($currentMood !== null) {
					currentDay.update((cd) => {
						cd.moodLogs.push({ ...$currentMood, endUnix: Date.now() });
						return cd;
					});
					currentMood.set(null);
					localStorage.removeItem('activeMood');
					isEditingNote = false;
				}
			}}
			horizontalCenter={true}
			figmaImportConfig={panelContainerConfig}
			transitions={getTransition(4)}
			figmaImport={{ mobile: { top: 84, left: '50%', width: 228, height: 47 } }}
			label="Add to history"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
		/>
	{/if}
	{#if isEditingNote}
		<HorizontalLine
			transitions={getTransition(2)}
			figmaImportConfig={panelContainerConfig}
			width="100%"
			color={$globalStyle.activeColor}
			style="height: 0.11vh;"
			figmaImport={{ mobile: { top: 144, left: '0', width: '100%' } }}
		/>
		<Box
			figmaImportConfig={panelContainerConfig}
			backgroundColor="{$globalStyle.activeColor}10"
			horizontalCenter={true}
			figmaImport={{ mobile: { top: 144, left: '50%', width: '100%', height: 185 } }}
		/>
		<Textarea
			on:onValue={(e) => {
				currentMood.update((cm) => {
					cm.note = e.detail;
					return cm;
				});
			}}
			paddingLeft="2%"
			paddingTop="2%"
			verticalFont={$globalStyle.mediumMobileFont}
			transitions={getTransition(1)}
			figmaImportConfig={panelContainerConfig}
			horizontalCenter={true}
			backgroundColor="{$globalStyle.activeColor}00"
			figmaImport={{ mobile: { top: 175, left: '50%', width: 328, height: 143 } }}
		/>
		<Label
			transitions={getTransition(1)}
			text="Write a note"
			figmaImportConfig={panelContainerConfig}
			verticalFont={$globalStyle.smallMobileFont}
			figmaImport={{ mobile: { top: 154, left: 11, wdith: 'auto', height: 'auto' } }}
		/>
	{/if}
</Box>
{#if isPickingMood}
	<Box width="100%" height="100%" backdropFilter="blur(50px)">
		<List figmaImport={{ mobile: { top: 30, left: 5, width: 350, height: 550 } }}>
			{#each $moodsArray as mood, ix}
				<ListItem
					marginBottom="4%"
					style="min-height: 10%;"
					transitions={getTransition(ix + 3)}
					figmaImportConfig={moodListItemConfig}
					figmaImport={{
						mobile: {
							top: 'auto',
							left: '0',
							width: '100%',
							height: moodListItemContentConfig.containerHeight
						}
					}}
				>
					<Label
						align="left"
						verticalFont={$globalStyle.mediumMobileFont}
						color={mood.color}
						left="15%"
						text={mood.title}
					/>
					<MoodLogDeco color={mood.color} left="1.3%" height="50%" />
					<Button
						onClick={() => {
							currentMood.set({ id: mood.id, startUnix: Date.now(), eflag: false, note: null });
							isPickingMood = false;
						}}
						width="100%"
						height="100%"
						borderColor={mood.color}
						backgroundColor={mood.color}
						hoverOpacityMin={5}
						hoverOpacityMax={20}
					/>
				</ListItem>
			{/each}
		</List>
	</Box>
	<Button
		onClick={() => {
			isPickingMood = false;
		}}
		horizontalCenter={true}
		transitions={getTransition(4)}
		figmaImport={{ mobile: { top: 585, left: '50%', width: 350, height: 47 } }}
		label="Back"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
	/>
{/if}
