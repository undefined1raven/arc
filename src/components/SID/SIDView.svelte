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
	import Input from '../common/Input.svelte';
	import DateInput from '../common/DateInput.svelte';
	import VerticalLine from '../common/VerticalLine.svelte';
	import NoteDeco from '../deco/NoteDeco.svelte';
	import InfoDeco from '../deco/InfoDeco.svelte';
	import { selectedSID } from './selectedSID';
	import timePadding from '../../fn/timePadding';
	import StatusPicker from '../common/StatusPicker.svelte';
	import NumericalInput from '../common/NumericalInput.svelte';
	import { SIDs, statusArray } from './SIDVault';
	import { updateSelectedSID } from './fn/updateSelectedSID';

	function datePadding(date) {
		if (date.length === 1) {
			return `0${date}`;
		} else {
			return date;
		}
	}

	function getDateFromUnix(unix) {
		const date = new Date(unix);
		let locDate = date.toLocaleDateString();
		let revlocDate = `${locDate.split('/')[2]}-${datePadding(locDate.split('/')[0])}-${datePadding(
			locDate.split('/')[1]
		)}`;
		return revlocDate;
	}

	$: selectedStatus = $statusArray.find((elm) => elm.id === $selectedSID.statusID);
	let showStatusPicker = false;
	const width = 334;

	function getTransition(stage) {
		return {
			in: { func: fly, options: { delay: stage * 50, duration: 200, y: '-4%' } }
		};
	}
</script>

<Label
	transitions={getTransition(1)}
	text="Status"
	figmaImport={{ mobile: { top: 30, left: 13 } }}
/>
<Button
	transitions={getTransition(1)}
	onClick={() => {
		showStatusPicker = true;
	}}
	label={selectedStatus?.name}
	color={selectedStatus?.color}
	borderColor={selectedStatus?.color}
	backgroundColor={selectedStatus?.color}
	hoverOpacityMin={10}
	verticalFont={$globalStyle.mediumMobileFont}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 53, left: 13, width: 138, height: 28 } }}
/>
<Label
	transitions={getTransition(1)}
	text="First Contact"
	figmaImport={{ mobile: { top: 30, left: 195 } }}
/>
<DateInput
	on:onValue={(e) => {
		updateSelectedSID('firstContact', new Date(e.detail).getTime());
	}}
	transitions={getTransition(1)}
	defaultValue={getDateFromUnix($selectedSID.firstContact)}
	verticalFont={$globalStyle.mediumMobileFont}
	figmaImport={{ mobile: { top: 53, left: 195, width: 138, height: 28 } }}
/>
<VerticalLine
	transitions={getTransition(1)}
	color={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 30, width: 1, left: 172, height: 51 } }}
/>
<HorizontalLine
	transitions={getTransition(2)}
	color={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 88, width: 334, left: 13, height: 1 } }}
/>
<Label
	transitions={getTransition(2)}
	text="Alias"
	figmaImport={{ mobile: { top: 96, left: 13 } }}
/>
<Label transitions={getTransition(2)} text="SID" figmaImport={{ mobile: { top: 96, left: 195 } }} />
<Box
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 119, left: 13, width: 138, height: 28 } }}
>
	<Input
		on:onValue={(e) => {
			if (e.detail.length > 5) {
				updateSelectedSID('alias', e.detail.toString().substring(0, 5));
			} else {
				updateSelectedSID('alias', e.detail);
			}
		}}
		width="100%"
		height="100%"
		value={$selectedSID.alias}
		style="padding-left: 2%;"
		defaultValue={$selectedSID.alias}
		verticalFont={$globalStyle.mediumMobileFont}
	/>
</Box>

<Box
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 119, left: 195, width: 138, height: 28 } }}
>
	<NumericalInput
		on:onValue={(e) => {
			if (e.detail.toString().length >= 5) {
				updateSelectedSID('CID', $selectedSID.CID);
			} else {
				updateSelectedSID('CID', e.detail);
			}
		}}
		value={$selectedSID.CID}
		defaultValue={$selectedSID.CID}
		style="padding-left: 20%;"
		verticalFont={$globalStyle.mediumMobileFont}
		width="100%"
		height="100%"
	/>
	<Label text="#" left="5%" />
</Box>
<VerticalLine
	transitions={getTransition(2)}
	color={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 96, width: 1, left: 172, height: 51 } }}
/>
<HorizontalLine
	transitions={getTransition(3)}
	color={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 154, width: 334, left: 13, height: 1 } }}
/>
<Box
	transitions={getTransition(3)}
	style="overflow: hidden;"
	figmaImport={{ mobile: { top: 155, width: 334, left: 13, height: 148 } }}
>
	<RingDeco ring={$selectedSID.ring} width="37%" left="3%" height="70%" />
	<RingSelector
		width="50%"
		height="90%"
		left="50%"
		selectedRing={$selectedSID.ring}
		on:onSelectedRing={(e) => {
			updateSelectedSID('ring', e.detail);
		}}
	/>
</Box>
<HorizontalLine
	transitions={getTransition(4)}
	color={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 303, width: 334, left: 13, height: 1 } }}
/>
<Button
	onClick={() => {
		window.location.hash = 'notes';
	}}
	transitions={getTransition(4)}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 325, width: 334, left: 13, height: 63 } }}
	><Label text="Notes" left="2%" /><NoteDeco width="10%" height="70%" left="85%" /></Button
>
<Button
	color={$globalStyle.inactiveColor}
	borderColor={$globalStyle.inactiveColor}
	backgroundColor={$globalStyle.inactiveColor}
	transitions={getTransition(5)}
	hoverOpacityMin={0}
	hoverOpacityMax={0}
	figmaImport={{ mobile: { top: 402, width: 334, left: 13, height: 63 } }}
	><Label color={$globalStyle.inactiveColor} text="Info" left="2%" /><InfoDeco
		color={$globalStyle.inactiveColor}
		width="15%"
		height="80%"
		left="82%"
	/></Button
>
<Button
	onClick={() => {
		const SIDElm = $SIDs.find((elm) => elm.SIDID === $selectedSID.SIDID);
		const SIDIX = $SIDs.indexOf(SIDElm);
		SIDs.update((sids) => {
			sids[SIDIX]['show'] = false;
			window.location.hash = 'home';
			return sids;
		});
	}}
	transitions={getTransition(6)}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	label="Delete SID"
	color={$globalStyle.errorColor}
	borderColor={$globalStyle.errorColor}
	backgroundColor={$globalStyle.errorColor}
	figmaImport={{ mobile: { top: 479, width: 334, left: 13, height: 44 } }}
/>
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
		window.location.hash = 'home';
	}}
	figmaImport={{ mobile: { top: 574, width: 334, left: 13, height: 44 } }}
/>
{#if showStatusPicker === true}
	<StatusPicker
		{statusArray}
		on:onBack={() => {
			showStatusPicker = false;
		}}
		on:onStatusSelected={(e) => {
			updateSelectedSID('statusID', e.detail);
			showStatusPicker = false;
		}}
	/>
{/if}
