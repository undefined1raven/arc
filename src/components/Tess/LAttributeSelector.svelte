<script lang="ts">
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let containerConfig = { containerHeight: 10, containerWidth: 10 };
	let LID = '';
	let color = $globalStyle.activeColor;
	let left = 0;
	let top = -10;
	let x = 0;
	let y = 0;
	let transitionIX = 1;
	let selectedL = 'none';
	let readOnly = false;
	export { containerConfig, LID, color, left, top, transitionIX, x, y, selectedL, readOnly };
</script>

<Box
	transitions={getTransition(transitionIX)}
	figmaImportConfig={containerConfig}
	figmaImport={{ mobile: { top: top, left: left, width: 61, height: 68 } }}
>
	<Button
		width="100%"
		height="45%"
		label={LID}
		{color}
		onClick={() => {
			if (readOnly === false) {
				if (selectedL === LID) {
					dispatch('selectedL', 'none');
				} else {
					dispatch('selectedL', LID);
				}
			}
		}}
		hoverOpacityMin={selectedL === LID ? 40 : 0}
		hoverOpacityMax={selectedL === LID ? 40 : readOnly ? 0 : 20}
		backgroundColor={color}
		borderColor={color}
	/>
	<Label
		{color}
		verticalFont={$globalStyle.smallMobileFont}
		text="x: {x.toFixed(1)}"
		width="100%"
		backgroundColor="{color}20"
		height="22.5%"
		top="80%"
	/>
	<Label
		{color}
		verticalFont={$globalStyle.smallMobileFont}
		text="y: {y.toFixed(1)}"
		width="100%"
		backgroundColor="{color}20"
		height="22.5%"
		top="107%"
	/>
</Box>
