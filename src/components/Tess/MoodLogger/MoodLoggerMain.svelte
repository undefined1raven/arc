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
	import MoodLoggerControlPanel from './MoodLoggerControlPanel.svelte';
	import MoodEditor from './MoodEditor.svelte';
	const dispatch = createEventDispatcher();
	function onBack() {
		dispatch('back');
	}
	let isEditingMoods = false;
	const dayHistoryListItemConfig = { containerHeight: 367, containerWidth: 350 };
	const dayHistoryListItemContentConfig = { containerHeight: 70, containerWidth: 350 };

	function updateCurrentMoodStore(localStorageVal) {
		if (localStorageVal !== null) {
			currentMood.set(JSON.parse(localStorageVal));
		}
	}

	$: updateCurrentMoodStore(localStorage.getItem('activeMood'));

	onMount(() => {
		currentDay.update((x) => {
			x['moodLogs'] = [
				{ id: 'MD-0', startUnix: Date.now(), endUnix: Date.now(), note: 'xsxs', eflag: true },
				{ id: 'MD-2', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: true },
				{ id: 'MD-2', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: true },
				{ id: 'MD-2', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: true },
				{ id: 'MD-4', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: false },
				{ id: 'MD-4', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: true },
				{ id: 'MD-2', startUnix: Date.now(), endUnix: Date.now(), note: null, eflag: true }
			];
			return x;
		});
	});
	function getMoodConfig(id) {
		return $moodsArray.find((elm) => elm.id === id);
	}
	function getDisplayTimeRangeLabel(moodLog) {
		const startTimeUnix = moodLog.startUnix;
		const endTimeUnix = moodLog.endUnix;
		const displayStartTime = getTimeFromUnix(startTimeUnix);
		const displayEndTime = getTimeFromUnix(endTimeUnix);
		return `${displayStartTime} >>> ${displayEndTime}`;
	}
</script>

{#if isEditingMoods === false}
	<Label
		figmaImport={{ mobile: { top: 30, left: 55, width: 194, height: 36 } }}
		align="left"
		alignPadding="4%"
		text="Moods"
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
			isEditingMoods = !isEditingMoods;
		}}
		figmaImport={{ mobile: { top: 30, left: 260, width: 95, height: 36 } }}
		transitions={getTransition(1)}><EditDeco height="70%" /></Button
	>

	<Label
		figmaImport={{ mobile: { top: 75, left: 5, width: 350, height: 36 } }}
		align="left"
		alignPadding="15%"
		text="Day History"
		transitions={getTransition(2)}
		backgroundColor="{$globalStyle.activeColor}20"><MoodLoggerDeco left="2%" height="70%" /></Label
	>

	<List figmaImport={{ mobile: { top: 120, left: 5, width: 350, height: 360 } }}>
		{#each $currentDay.moodLogs as moodLog, ix}
			<ListItem
				marginBottom="4%"
				style="min-height: 20%;"
				transitions={getTransition(ix + 3)}
				figmaImportConfig={dayHistoryListItemConfig}
				figmaImport={{
					mobile: {
						top: 'auto',
						left: '0',
						width: '100%',
						height: dayHistoryListItemContentConfig.containerHeight
					}
				}}
			>
				<Label
					text={getMoodConfig(moodLog.id)?.title}
					color={getMoodConfig(moodLog.id)?.color}
					align="left"
					figmaImportConfig={dayHistoryListItemContentConfig}
					figmaImport={{ mobile: { top: 13, left: 55, width: 211, height: 'auto' } }}
				/>
				<Label
					align="left"
					verticalFont={$globalStyle.mediumMobileFont}
					text={getDisplayTimeRangeLabel(moodLog)}
					color={getMoodConfig(moodLog.id)?.color}
					figmaImportConfig={dayHistoryListItemContentConfig}
					figmaImport={{ mobile: { top: 43, left: 55, width: 211, height: 'auto' } }}
				/>
				<MoodLogDeco color={getMoodConfig(moodLog.id)?.color} left="1.3%" height="50%" />
				<Button
					width="100%"
					height="100%"
					borderColor={getMoodConfig(moodLog.id)?.color}
					backgroundColor={getMoodConfig(moodLog.id)?.color}
					hoverOpacityMin={5}
					hoverOpacityMax={20}
				/>
				<Label
					verticalFont={$globalStyle.smallMobileFont}
					text={moodLog.note === null ? 'N/A' : 'Note'}
					color={moodLog.note === null
						? $globalStyle.inactiveColor
						: getMoodConfig(moodLog?.id)?.color}
					borderColor={moodLog.note === null
						? $globalStyle.inactiveColor
						: getMoodConfig(moodLog?.id).color}
					figmaImportConfig={dayHistoryListItemContentConfig}
					verticalCenter={true}
					figmaImport={{ mobile: { top: '50%', left: 287, width: 56, height: 18 } }}
				/>
				{#if moodLog.eflag}
					<EflagDeco style="right: 17%;" height="22%" color={getMoodConfig(moodLog?.id)?.color} />
				{/if}
			</ListItem>
		{/each}
	</List>
	<MoodLoggerControlPanel />
{:else}
	<MoodEditor
		on:back={(e) => {
			isEditingMoods = false;
		}}
	/>
{/if}
