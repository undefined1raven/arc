<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import RingDeco from '../deco/RingDeco.svelte';
	import TessMain from './TessMain.svelte';
	import TessMainMenu from './TessMainMenu.svelte';
	import { activeTessApp } from './activeTessApp';
	import { getTransition } from '../../fn/getTransisitions';
	import Ex7Deco from '../deco/EX7Deco.svelte';
	import PmmDeco from '../deco/PMMDeco.svelte';
	import isMobile from '../../fn/isMobile';
</script>

<Button
	onClick={() => {
		activeTessApp.set('ex7');
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	transitions={getTransition(1)}
	figmaImport={{
		mobile: { top: 30, left: '50%', width: 350, height: 181 },
		desktop: { top: 425, left: 778, width: 190, height: 250 }
	}}
	horizontalCenter={isMobile() ? true : false}
	><Label
		text="EX7 Logger"
		desktopFont={$globalStyle.mediumDesktopFont}
		top="20%"
		verticalFont={$globalStyle.largeMobileFont}
	/><Ex7Deco width="50%" height="70%" top="25%" /></Button
>
<Button
	onClick={() => {
		activeTessApp.set('pmm');
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	transitions={getTransition(2)}
	figmaImport={{
		mobile: { top: 224, left: '50%', width: 350, height: 181 },
		desktop: { top: 425, left: 979, width: 190, height: 250 }
	}}
	horizontalCenter={isMobile() ? true : false}
	><Label
		desktopFont={$globalStyle.mediumDesktopFont}
		verticalFont={$globalStyle.largeMobileFont}
		text="PMM"
		top="20%"
	/><PmmDeco width="50%" height="70%" top="25%" /></Button
>
