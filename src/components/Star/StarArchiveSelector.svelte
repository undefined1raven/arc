<script lang="ts">
	import { onMount } from 'svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import StarDeco from '../deco/StarDeco.svelte';
	import { activeStarApp } from './activeStarApp';
	import ListItem from '../common/ListItem.svelte';
	import List from '../common/List.svelte';
	import { datePadding } from '../../fn/datePadding';
	import timePadding from '../../fn/timePadding';
	import DateInput from '../common/DateInput.svelte';
	import { starAccess } from './starPassword';
	import AddDeco from '../deco/AddDeco.svelte';
	import { starSelectedArchive, starSelectedArchiveDisplayName } from './starSelectedArchive';

	let archives =
		localStorage.getItem('starArchiveNameMap') !== null
			? JSON.parse(localStorage.getItem('starArchiveNameMap'))
			: [];
	onMount(() => {
		if ($starAccess === false) {
			window.location.hash = '#login';
		}
	});
</script>

<Box figmaImport={{ mobile: { top: 86, left: 2, width: 356, height: 552 } }}>
	<List direction="column" width="100%" height="100%">
		{#each archives as archive, ix}
			<ListItem transitions={getTransition(ix + 1)} width="100%" height="10%" marginBottom="4%">
				<Box width="100%" height="100%">
					<Label
						text={archive.displayName}
						left="2%"
						verticalFont={$globalStyle.mediumMobileFont}
					/>
					<Button
						onClick={() => {
							starSelectedArchive.set(archive.archiveID);
							starSelectedArchiveDisplayName.set(archive.displayName);
							window.location.hash = '#archive';
						}}
						width="100%"
						height="100%"
						hoverOpacityMin={0}
						hoverOpacityMax={20}
						borderColor={$globalStyle.activeMono}
					/></Box
				>
			</ListItem>
		{/each}
		<Button
			onClick={() => {
				window.location.hash = '#archiveSetup.selectSourceType';
			}}
			transitions={getTransition(archives.length + 3)}
			width="50%"
			height="6%"
			style="position: relative;"
			borderColor={$globalStyle.activeMono}
			hoverOpacityMin={0}
			><AddDeco width="50%" height="30%" color={$globalStyle.activeMono} /></Button
		>
	</List></Box
>
