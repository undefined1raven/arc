<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import RingDeco from '../deco/RingDeco.svelte';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';
	import LinesDeco from '../deco/LinesDeco.svelte';
	import RingSelector from '../deco/RingSelector.svelte';
	import { fly } from 'svelte/transition';
	import { selectedSID } from './selectedSID';
	import Input from '../common/Input.svelte';
	import SearchDeco from '../deco/SearchDeco.svelte';
	import FileDeco from '../deco/FileDeco.svelte';
	import { selectedNote } from './selectedNoted';
	import TrashDeco from '../deco/TrashDeco.svelte';
	import NoteDeco from '../deco/NoteDeco.svelte';
	import { v4 } from 'uuid';
	import { appColors } from '../../config/appColors';
	import { updateSelectedSID } from './fn/updateSelectedSID';
	import { datePadding } from '../../fn/datePadding';
	import timePadding from '../../fn/timePadding';
	function getTransition(stage) {
		return {
			in: { func: fly, options: { delay: stage * 50, duration: 200, y: '-4%' } }
		};
	}

	function addNote() {
		const unixStr = Date.now().toString();
		const newNote = {
			tx: Date.now(),
			content: 'Write note here...',
			name: 'NID.' + unixStr.substring(unixStr.length - 5, 5),
			NID: `NID-${v4()}`,
			color: appColors.sid.activeColor,
			show: true
		};
		let notes = $selectedSID.notes;
		notes.push(newNote);
		updateSelectedSID('notes', notes);
		selectedNote.set(newNote);
		window.location.hash = 'noteView';
	}

	function getDateTimeDisplayInfo(noteTX) {
		let date = new Date(noteTX);
		let displayDate = `${datePadding(parseFloat(date.getDate()) + 1)}-${datePadding(
			date.getMonth()
		)}-${date.getFullYear()}`;

		let displayTime = `${timePadding(date.getHours())}:${timePadding(
			date.getMinutes()
		)}:${timePadding(date.getSeconds())}`;

		return { displayDate: displayDate, displayTime: displayTime };
	}

	let selectedNotes = {};
</script>

<Label
	transitions={getTransition(1)}
	text="#{$selectedSID.CID}"
	style="text-align: start; padding-left: 2%; justify-content: start; border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 30, left: 13, width: 95, height: 28 } }}
/>
<Label
	transitions={getTransition(1)}
	text="Notes"
	style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: solid 1px {$globalStyle.activeColor};"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 30, left: 108, width: 95, height: 28 } }}
/>
<Box
	transitions={getTransition(3)}
	figmaImport={{ mobile: { top: 67, left: 13, width: 334, height: 28 } }}
>
	<Input
		width="100%"
		style="padding-left: 12%;"
		height="100%"
		verticalFont={$globalStyle.mediumMobileFont}
		borderColor={$globalStyle.activeColor}
	/>
	<SearchDeco left="2%" width="10%" height="60%" />
</Box>
<Button
	onClick={() => {
		addNote();
	}}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 30, left: 248, width: 99, height: 28 } }}
	label="+"
	verticalFont={$globalStyle.largeMobileFont}
	hoverOpacityMax={20}
	hoverOpacityMin={0}
/>
<List
	figmaImport={{ mobile: { top: 107, left: '50%', width: 334, height: 454 } }}
	horizontalCenter={true}
>
	{#if $selectedSID.notes.length === 0}
		<Box transitions={getTransition(3)} width="80%" height="40%" top="20%">
			<FileDeco width="80%" height="20%" top="0%" />
			<Label text="[No Notes]" top="30%" color={$globalStyle.secondaryMono} />
			<Button
				onClick={() => {
					addNote();
				}}
				label="Add a note"
				width="100%"
				height="30%"
				top="50%"
				hoverOpacityMax={20}
				hoverOpacityMin={0}
			/>
		</Box>
	{/if}
	{#each $selectedSID.notes as note, ix}
		{#if note.show === true}
			<ListItem style="min-height: 10%;" width="100%" height="10%" marginBottom="5%"
				><Button
					borderColor={selectedNotes[note.NID] === 'selected' ? '#00000000' : note.color}
					backgroundColor={note.color}
					onSelect={(e) => {
						selectedNotes[note.NID] = 'selected';
					}}
					onClick={() => {
						if (selectedNotes[note.NID] !== 'selected') {
							selectedNote.set({ ...note, ini: true });
							window.location.hash = 'noteView';
						}
					}}
					hoverOpacityMin={selectedNotes[note.NID] === 'selected' ? 20 : 0}
					hoverOpacityMax={20}
					transitions={{
						in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
					}}
					width="100%"
					height="100%"
					><FileDeco color={note.color} left="2%" width="10%" height="70%" />
					{#if selectedNotes[note.NID] !== 'selected'}
						<Label
							color={note.color}
							text={getDateTimeDisplayInfo(note.tx).displayDate}
							verticalFont={$globalStyle.smallMobileFont}
							style="right: 1%;"
						/>
						<Label
							color={note.color}
							top="65%"
							text={getDateTimeDisplayInfo(note.tx).displayTime}
							verticalFont={$globalStyle.smallMobileFont}
							style="right: 1%;"
						/>
						<Label
							color={note.color}
							top="13%"
							text="{note.NID.split('-')[0]}-{note.NID.split('-')[2].toLocaleUpperCase()}"
							verticalFont={$globalStyle.smallMobileFont}
							style="right: 1%;"
						/>
					{:else}
						<Button
							className="noteDelButton"
							onClick={() => {
								let updatedNotes = $selectedSID.notes;
								updatedNotes[ix].show = false;
								updateSelectedSID('notes', updatedNotes);
							}}
							width="40%"
							style="right: 0%;"
							height="100%"
							borderColor={$globalStyle.errorColor}
							backgroundColor={$globalStyle.errorColor}
							hoverOpacityMin={80}
							hoverOpacityMax={20}><TrashDeco width="30%" height="50%" color="#FFFFFF" /></Button
						>
					{/if}
					<Label color={note.color} text={note.name} left="14%" />
				</Button></ListItem
			>
		{/if}
	{/each}
</List>
<Button
	onClick={() => {
		window.location.hash = 'SIDView';
	}}
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 574, left: 13, width: 334, height: 44 } }}
	label="Back"
/>
<svelte:body
	on:click={(e) => {
		const targetClass = e.target.className;
		if (targetClass.baseVal === undefined) {
			if (targetClass.split(' ').find((elm) => elm === 'noteDelButton') === undefined) {
				selectedNotes = {};
			}
		} else {
			if (targetClass.baseVal !== 'trashDeco') {
				selectedNotes = {};
			}
		}
	}}
/>
