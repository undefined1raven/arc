<script lang="ts">
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import FltProcessRestartDeco from '../deco/FLTProcessRestartDeco.svelte';
	import StarMsgArchiveDeco from '../deco/StarMsgArchiveDeco.svelte';
	import { activeStarApp } from './activeStarApp';
</script>

<Box
	transitions={getTransition(1)}
	figmaImport={{ mobile: { top: 83, left: 10, width: 340, height: 63 } }}
>
	<Label text="Message Archive" left="18%" />
	<StarMsgArchiveDeco left="0%" height="75%" width="15%" color={$globalStyle.activeMono} />
	<Button
		onClick={() => {
			// activeStarApp.set('messageArchive');
			window.location.hash = '#archiveSelector';
		}}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		borderColor={$globalStyle.activeMono}
		width="100%"
		height="100%"
	/>
</Box>


