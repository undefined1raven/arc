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
	import { getTransition } from '../../fn/getTransisitions';
	import { selectedNote } from './selectedNoted';
	import Textarea from '../common/Textarea.svelte';
	import { datePadding } from '../../fn/datePadding';
	import timePadding from '../../fn/timePadding';
	import ColorInput from '../common/ColorInput.svelte';
	import { SIDs } from './SIDVault';

	let date = new Date($selectedNote.tx);
	$: displayDate = `${datePadding(parseFloat(date.getDate()) + 1)}-${datePadding(
		date.getMonth()
	)}-${date.getFullYear()}`;

	$: displayTime = `${timePadding(date.getHours())}:${timePadding(date.getMinutes())}:${timePadding(
		date.getSeconds()
	)}`;

	function updateNote(objOverride) {
		SIDs.update((sids) => {
			const SIDelm = sids.find((elm) => elm.SIDID === $selectedSID.SIDID);
			const ix = sids.indexOf(SIDelm);
			let notes = sids[ix].notes;
			const noteElm = notes.find((elm) => elm.NID === $selectedNote.NID);
			const noteIX = notes.indexOf(noteElm);
			notes[noteIX] = { ...notes[noteIX], ...objOverride };
			sids[ix]['notes'] = notes;
			return sids;
		});
	}
</script>

<Label
	transitions={getTransition(0)}
	text="#{$selectedSID.CID}"
	style="text-align: start; padding-left: 2%; justify-content: start; border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 30, left: 13, width: 95, height: 28 } }}
/>
<Label
	transitions={getTransition(0)}
	text="Notes"
	style=" border-left: solid 1px {$globalStyle.activeColor};"
	backgroundColor="{$globalStyle.activeColor}20"
	figmaImport={{ mobile: { top: 30, left: 108, width: 98, height: 28 } }}
/>
<Box
	transitions={getTransition(1)}
	text="{$selectedNote.NID.split('-')[0]}-{$selectedNote.NID.split('-')[2]}"
	style="overflow: hidden; border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-left: solid 1px {$globalStyle.activeColor};"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 30, left: 207, width: 140, height: 28 } }}
	><ColorInput
		defaultValue={$selectedNote.color}
		on:onValue={(e) => {
			updateNote({ color: e.detail });
		}}
		width="140%"
		height="150%"
	/></Box
>
<Box
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 76, left: 13, width: 334, height: 45 } }}
>
	<Input
		on:onValue={(e) => {
			updateNote({ name: e.detail });
		}}
		style="padding-left: 2%;"
		defaultValue={$selectedNote.name}
		width="100%"
		height="100%"
	/></Box
>
<Box
	transitions={getTransition(3)}
	figmaImport={{ mobile: { top: 139, left: 13, width: 334, height: 365 } }}
>
	<Textarea
		on:onValue={(e) => {
			updateNote({ content: e.detail });
		}}
		style="padding: 2%;"
		defaultValue={$selectedNote.content}
		width="100%"
		height="100%"
	/></Box
>
<Label
	color={$globalStyle.secondaryMono}
	transitions={getTransition(4)}
	figmaImport={{ mobile: { top: 522, left: 13 } }}
	verticalFont={$globalStyle.smallMobileFont}
	text={$selectedNote.NID}
/>
<Label
	color={$globalStyle.secondaryMono}
	transitions={getTransition(5)}
	figmaImport={{ mobile: { top: 532, left: 13 } }}
	verticalFont={$globalStyle.smallMobileFont}
	text={displayDate}
/>
<Label
	color={$globalStyle.secondaryMono}
	transitions={getTransition(5)}
	figmaImport={{ mobile: { top: 542, left: 13 } }}
	verticalFont={$globalStyle.smallMobileFont}
	text={displayTime}
/>
<Button
	onClick={() => {
		window.location.hash = 'notes';
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
