<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import windowHash from '../../stores/windowHash';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import InstaLogo from '../deco/InstaLogo.svelte';
	import StarDeco from '../deco/StarDeco.svelte';
	import { activeStarApp } from './activeStarApp';
	import { starSelectedArchive, starSelectedArchiveDisplayName } from './starSelectedArchive';

	const headerProps = { containerHeight: 51, containerWidth: 356 };
	const hashToLabel = {
		'#login': 'Star Vault \\ Access',
		'#archive': 'Star Vault \\ Message Archive',
		'#archiveSelector': 'Star Vault \\ Message Archive',
		'#home': 'Star Vault',
		'#archiveSetup.selectSourceType': 'Star Vault \\ Archive Setup [0/3]',
		'#archiveSetup.pickFile': 'Star Vault \\ Archive Setup [1/3]',
		'#archiveSetup.linkSID': 'Star Vault \\ Archive Setup [2/3]',
		'#archiveSetup.finishUp': 'Star Vault \\ Archive Setup [3/3]'
	};
	$: hasSubHeader = $windowHash === '#archive' && $starSelectedArchive.length > 0;
	$: labelText = hashToLabel[$windowHash];
</script>

<Box
	transitions={getTransition(1)}
	backgroundColor="{$globalStyle.activeColor}10"
	figmaImport={{ mobile: { top: 21, left: 2, width: 356, height: 51 } }}
>
	<Box
		transitions={getTransition(2)}
		figmaImportConfig={headerProps}
		figmaImport={{ mobile: { top: 0, left: 5, width: '15%', height: '100%' } }}
	>
		<StarDeco color={$globalStyle.activeMono} width="100%" height="100%" />
	</Box>
	<Label
		transitions="{getTransition(3)}s"
		style="transition: top ease-in-out 0.1s;"
		text={labelText}
		top={hasSubHeader ? '20%' : '40%'}
		left="18%"
		verticalFont={$globalStyle.regularMobileFont}
	/>
	{#if hasSubHeader}
		<Label
			transitions={{ in: { func: fly, options: { x: '-40%', duration: 300 } } }}
			text={$starSelectedArchiveDisplayName}
			top="59%"
			left="23%"
			verticalFont={'13px'}
		/>
		<Box
			transitions={{ in: { func: fly, options: { y: '-40%', duration: 300 } } }}
			left="7.8%"
			width="25%"
			height="25%"
			top="57%"
		>
			<InstaLogo width="100%" height="100%" color={$globalStyle.activeMono} />
		</Box>
	{/if}
</Box>
