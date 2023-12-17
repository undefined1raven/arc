<script>
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Input from '../common/Input.svelte';
	import Label from '../common/Label.svelte';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';
	import NumericalInput from '../common/NumericalInput.svelte';
	import AddDeco from '../deco/AddDeco.svelte';
	import { exfArray } from './TessVault';
	import { v4 } from 'uuid';
	import TrashDeco from '../deco/TrashDeco.svelte';

	let selectedEXF = 'none';
</script>

<Label
	text="EXF Editor"
	style="padding-left: 2%; text-align: start; justify-content: start;"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	transitions={getTransition(1)}
	figmaImport={{ mobile: { top: 30, left: 5, width: 350, height: 36 } }}
/>
<Label
	text="Event Name"
	style="padding-left: 2%; text-align: start; justify-content: start;"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 77, left: 5, width: 229, height: 36 } }}
/>
<Label
	text="Score"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 77, left: 245, width: 110, height: 36 } }}
/>
<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor};"
	transitions={getTransition(3)}
	figmaImport={{ mobile: { top: 124, left: 5, width: 350, height: 450 } }}
>
	<List width="100%" height="100%">
		{#each $exfArray as exf, ix}
			{#if exf.show === true}
				<ListItem style="min-height: 10%;" marginBottom="4%" width="100%" height="10%">
					<Box
						onSelected={() => {
							selectedEXF = exf.EXFID;
						}}
						width="100%"
						height="100%"
						transitions={{
							in: { func: fly, options: { delay: ix * 40, duration: 200, y: '-4%' } }
						}}
					>
						<Input
							on:onValue={(e) => {
								exfArray.update((exfa) => {
									exfa[ix]['event'] = e.detail;
									return exfa;
								});
							}}
							borderColor={$globalStyle.activeColor}
							left="0%"
							style="padding-left: 2%;"
							width="65%"
							height="100%"
							defaultValue={exf.event}
						/>
						{#if selectedEXF !== exf.EXFID}
							<NumericalInput
								on:onValue={(e) => {
									exfArray.update((exfa) => {
										exfa[ix]['score'] = parseFloat(e.detail);
										return exfa;
									});
								}}
								borderColor={$globalStyle.activeColor}
								defaultValue={exf.score}
								width="31%"
								style="text-align: center;"
								left="69%"
								height="100%"
							/>
						{:else}
							<Button
								onClick={() => {
									exfArray.update((exfa) => {
										exfa[ix]['show'] = false;
										return exfa;
									});
								}}
								className="noteDelButton"
								width="31%"
								left="69%"
								height="100%"
								borderColor={$globalStyle.errorColor}
								hoverOpacityMin={0}
								hoverOpacityMax={20}
								backgroundColor={$globalStyle.errorColor}
								><TrashDeco width="30%" height="50%" color={$globalStyle.errorColor} /></Button
							>
						{/if}
					</Box></ListItem
				>
			{/if}
		{/each}
	</List></Box
>
<Button
	onClick={() => {
		window.location.hash = 'EX7currentDay';
	}}
	label="Done"
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	transitions={getTransition(4)}
	figmaImport={{ mobile: { top: 585, left: 5, width: 170, height: 45 } }}
/>
<Button
	onClick={() => {
		exfArray.update((exfa) => {
			exfa.push({ show: true, EXFID: `EXFID-${v4()}`, event: `E-${v4().split('-')[1]}`, score: 0 });
			return exfa;
		});
	}}
	label=""
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	transitions={getTransition(4)}
	figmaImport={{ mobile: { top: 585, left: 185, width: 170, height: 45 } }}
	><AddDeco width="70%" height="50%" /></Button
>
<svelte:body
	on:click={(e) => {
		try {
			const targetClass = e.target.className;
			if (targetClass.baseVal === undefined) {
				if (targetClass.split(' ').find((elm) => elm === 'noteDelButton') === undefined) {
					selectedEXF = 'none';
				}
			} else {
				if (targetClass.baseVal !== 'trashDeco') {
					selectedEXF = 'none';
				}
			}
		} catch (e) {}
	}}
/>
