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
	import NumericalInput from '../../common/NumericalInput.svelte';
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
	import MoodLoggerControlPanel from './MoodLoggerControlPanel.svelte';
	import AddDeco from '../../deco/AddDeco.svelte';
	import { selectedMoodToEdit } from './selectedMoodToEdit';
	import ColorInput from '../../common/ColorInput.svelte';
	import NumberPicker from '../../common/NumberPicker.svelte';
	import { v4 } from 'uuid';
	const dispatch = createEventDispatcher();
	function onBack() {
		dispatch('back');
	}
	let isShowingMoodConfig = false;
	const moodListItemConfig = { containerHeight: 559, containerWidth: 350 };
	const moodListItemContentConfig = { containerHeight: 53, containerWidth: 350 };

	function updateCurrentMoodStore(localStorageVal) {
		if (localStorageVal !== null) {
			currentMood.set(JSON.parse(localStorageVal));
		}
	}

	$: updateCurrentMoodStore(localStorage.getItem('activeMood'));
</script>

{#if isShowingMoodConfig === false}
	<Label
		figmaImport={{ mobile: { top: 30, left: 55, width: 194, height: 36 } }}
		align="left"
		alignPadding="4%"
		text="Edit Moods"
		transitions={getTransition(1)}
		borderColor={$globalStyle.activeColor}
		style="border: none; border-left: solid 1px {$globalStyle.activeColor}; border-top-left-radius: 0; border-bottom-left-radius: 0;"
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Button
		onClick={onBack}
		figmaImport={{ mobile: { top: 30, left: 5, width: 49, height: 36 } }}
		transitions={getTransition(1)}
		style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
		borderColor="{$globalStyle.activeColor}00"><DropdownDeco height="70%" /></Button
	>

	<Button
		onClick={() => {
			const newMood = {
				title: 'New Mood',
				color: $globalStyle.activeColor,
				score: 0,
				id: `MD-${v4()}`
			};
			moodsArray.update((ma) => {
				ma.push(newMood);
				return ma;
			});
		}}
		figmaImport={{ mobile: { top: 30, left: 260, width: 95, height: 36 } }}
		transitions={getTransition(1)}><AddDeco height="50%" /></Button
	>

	<List figmaImport={{ mobile: { top: 75, left: 5, width: 350, height: 559 } }}>
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
						isShowingMoodConfig = true;
						selectedMoodToEdit.set(mood);
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
{:else}
	<Label
		figmaImport={{ mobile: { top: 30, left: 55, width: 300, height: 36 } }}
		align="left"
		alignPadding="4%"
		text="Mood Config"
		transitions={getTransition(1)}
		borderColor={$globalStyle.activeColor}
		style="border: none; border-left: solid 1px {$globalStyle.activeColor}; border-top-left-radius: 0; border-bottom-left-radius: 0;"
		backgroundColor="{$globalStyle.activeColor}20"
	/>
	<Button
		onClick={() => {
			isShowingMoodConfig = false;
		}}
		figmaImport={{ mobile: { top: 30, left: 5, width: 49, height: 36 } }}
		transitions={getTransition(1)}
		style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
		borderColor="{$globalStyle.activeColor}00"><DropdownDeco height="70%" /></Button
	>

	<!-- <Button
		color={$globalStyle.errorColor}
		borderColor={$globalStyle.errorColor}
		backgroundColor={$globalStyle.errorColor}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		label="Delete Mood"
		verticalFont={$globalStyle.mediumMobileFont}
		figmaImport={{ mobile: { top: 30, left: 260, width: 95, height: 36 } }}
		transitions={getTransition(1)}
	/> -->

	<Label
		transitions={getTransition(2)}
		figmaImport={{ mobile: { top: 78, left: 5, width: 95, height: 36 } }}
		text="Name"
		borderRadius={$globalStyle.borderRadius}
		align="left"
		alignPadding="2%"
		verticalFont={$globalStyle.mediumMobileFont}
		backgroundColor="{$globalStyle.activeColor}20"
		style="border: none; border-left: solid 1px {$globalStyle.activeColor}; border-top-left-radius: 0; border-bottom-left-radius: 0;"
	/>
	<Input
		on:onValue={(e) => {
			moodsArray.update((ma) => {
				const moodIndex = $moodsArray.indexOf($selectedMoodToEdit);
				if (moodIndex > 0) {
					selectedMoodToEdit.update((smte) => {
						smte.title = e.detail;
						return smte;
					});
					ma[moodIndex] = $selectedMoodToEdit;
				}
				return ma;
			});
		}}
		transitions={getTransition(2)}
		paddingLeft="2%"
		figmaImport={{ mobile: { top: 78, left: 107, width: 248, height: 36 } }}
		defaultValue={$selectedMoodToEdit.title}
	/>
	<Label
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 126, left: 5, width: 95, height: 36 } }}
		text="Color"
		borderRadius={$globalStyle.borderRadius}
		align="left"
		alignPadding="2%"
		verticalFont={$globalStyle.mediumMobileFont}
		backgroundColor="{$globalStyle.activeColor}20"
		style="border: none; border-left: solid 1px {$globalStyle.activeColor}; border-top-left-radius: 0; border-bottom-left-radius: 0;"
	/>
	<ColorInput
		on:onValue={(e) => {
			moodsArray.update((ma) => {
				const moodIndex = $moodsArray.indexOf($selectedMoodToEdit);
				if (moodIndex > 0) {
					selectedMoodToEdit.update((smte) => {
						smte.color = e.detail;
						return smte;
					});
					ma[moodIndex] = $selectedMoodToEdit;
				}
				return ma;
			});
		}}
		defaultValue={$selectedMoodToEdit.color}
		style="border-radius: {$globalStyle.borderRadius};"
		figmaImport={{ mobile: { top: 126, left: 107, width: 248, height: 36 } }}
	/>
	<Label
		transitions={getTransition(4)}
		figmaImport={{ mobile: { top: 174, left: 5, width: 95, height: 36 } }}
		text="Score"
		borderRadius={$globalStyle.borderRadius}
		align="left"
		alignPadding="2%"
		verticalFont={$globalStyle.mediumMobileFont}
		backgroundColor="{$globalStyle.activeColor}20"
		style="border: none; border-left: solid 1px {$globalStyle.activeColor}; border-top-left-radius: 0; border-bottom-left-radius: 0;"
	/>
	<NumericalInput
		on:onValue={(e) => {
			moodsArray.update((ma) => {
				const moodIndex = $moodsArray.indexOf($selectedMoodToEdit);
				if (moodIndex > 0) {
					selectedMoodToEdit.update((smte) => {
						const input = e.detail;
						if (isNaN(parseInt(input)) === false) {
							if (input < -100) {
								smte.score = -100;
								return smte;
							}
							if (input > 100) {
								smte.score = 100;
								return smte;
							}
							smte.score = input;
						}
						return smte;
					});
					ma[moodIndex] = $selectedMoodToEdit;
				}
				return ma;
			});
		}}
		defaultValue={$selectedMoodToEdit.score}
		style="border-radius: {$globalStyle.borderRadius};"
		figmaImport={{ mobile: { top: 174, left: 107, width: 248, height: 36 } }}
	/>
{/if}
