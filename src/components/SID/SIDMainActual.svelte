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
	import { SIDs, availableSIDs, statusArray } from './SIDVault';
	import { v4 } from 'uuid';
	import RingLoadingDeco from '../common/RingLoadingDeco.svelte';
	function getStatusObjFromID(id) {
		return $statusArray.find((elm) => elm.id === id);
	}
</script>

{#if $availableSIDs === 0}
	<RingLoadingDeco />
{/if}

<List
	horizontalCenter={true}
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 30, width: 334, height: 526, left: '50%' } }}
	style="border-bottom: solid 1px {$globalStyle.activeColor};"
>
	{#each $SIDs as sid, ix}
		{#if sid.show === true}
			<ListItem
				style="min-height: 15.019011407%;"
				marginBottom="5%"
				width="100%"
				height="15.019011407%"
				><Box
					width="100%"
					height="100%"
					transitions={{
						in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
					}}
					><Button
						onClick={() => {
							selectedSID.set(sid);
							window.location.hash = '#SIDView';
						}}
						width="100%"
						height="100%"
						borderColor={$globalStyle.activeColor}
						backgroundColor={$globalStyle.activeColor}
						hoverOpacityMin={10}
						><RingDeco left="3.2%" ring={sid.ring} height="70%" width="18%" /><Label
							text={sid.alias}
							left="24%"
							verticalFont={$globalStyle.mediumMobileFont}
							width="16%"
							height="30%"
							backgroundColor="{$globalStyle.activeColor}20"
							borderRadius={$globalStyle.borderRadius}
							style="overflow: hidden; border-bottom-right-radius: 0px; border-top-right-radius: 0px;"
						/><Label
							text="#{sid.CID}"
							left="40%"
							width="30%"
							verticalFont={$globalStyle.mediumMobileFont}
							height="30%"
							backgroundColor="{$globalStyle.activeColor}20"
							style="border-left: solid 1px {$globalStyle.activeColor}; border-bottom-left-radius: 0px; border-top-left-radius: 0px;"
						/>
						<Label
							text={getStatusObjFromID(sid.statusID)?.name}
							left="70%"
							width="28%"
							verticalFont={$globalStyle.mediumMobileFont}
							height="30%"
							color={getStatusObjFromID(sid.statusID)?.color}
							borderRadius={$globalStyle.borderRadius}
							backgroundColor="{getStatusObjFromID(sid.statusID)?.color}20"
							style="border-left: solid 1px {getStatusObjFromID(sid.statusID)
								?.color}; border-bottom-left-radius: 0px; border-top-left-radius: 0px;"
						/>
					</Button></Box
				></ListItem
			>
		{/if}
	{/each}
</List>
<Button
	onClick={() => {
		const newSID = {
			SIDID: `SIDID-${v4()}`,
			alias: 'N/0',
			CID: '0000',
			firstContact: Date.now(),
			notes: [],
			info: [],
			ring: -1,
			statusID: 'STID-1',
			tx: Date.now(),
			show: true
		};
		SIDs.update((sids) => {
			sids.push(newSID);
			selectedSID.set(newSID);
			window.location.hash = 'SIDView';
			return sids;
		});
	}}
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={10}
	label="Add SID"
	color={$globalStyle.activeMono}
	backgroundColor={$globalStyle.activeColor}
	figmaImport={{ mobile: { top: 572, width: 334, height: 49, left: '50%' } }}
	horizontalCenter={true}><RingDeco /></Button
>
