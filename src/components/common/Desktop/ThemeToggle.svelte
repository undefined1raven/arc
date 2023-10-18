<script lang="ts">
	import Box from '../../common/Box.svelte';
	import Button from '../../common/Button.svelte';
	import globalStyle from '../../../stores/globalStyles';
	import { getDynamicBorderRadius } from '../../../fn/dynamicBorders';
	import LightmodeDeco from '../../deco/LightmodeDeco.svelte';
	import DarkModeDeco from '../../deco/DarkModeDeco.svelte';
	import isMobile from '../../../fn/isMobile';
	function toggleGlobalTheme(): void {
		globalStyle.update((g) => {
			g.theme = g.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', g.theme);
			return g;
		});
	}
</script>

<Box
	style="right: 0%; z-index: 190;"
	figmaImport={{ desktop: { height: 50, width: '14%', top: '0%' } }}
>
	{#if !isMobile()}
		<Button
			onClick={() => {
				toggleGlobalTheme();
			}}
			borderRadius={0}
			left="0%"
			style="border-bottom-left-radius: {getDynamicBorderRadius(5)};"
			width="50%"
			height="100%"
			color={$globalStyle.activeMono}
			borderColor={$globalStyle.activeColor}
			backgroundColor={$globalStyle.activeColor}
			hoverOpacityMin={$globalStyle.theme === 'light' ? 20 : 0}
			><LightmodeDeco width="70%" height="70%" /></Button
		>
		<Button
			onClick={() => {
				toggleGlobalTheme();
			}}
			borderRadius={0}
			left="50%"
			width="50%"
			style="border-left: none;"
			height="100%"
			color={$globalStyle.activeMono}
			borderColor={$globalStyle.activeColor}
			backgroundColor={$globalStyle.activeColor}
			hoverOpacityMin={$globalStyle.theme === 'dark' ? 20 : 0}
			><DarkModeDeco width="70%" height="70%" /></Button
		>{:else}
		<Button
			onClick={() => {
				toggleGlobalTheme();
			}}
			borderRadius={0}
			left="0%"
			top="0%"
			style="border-bottom-left-radius: {getDynamicBorderRadius(5)};"
			width="99%"
			height="50%"
			color={$globalStyle.activeMono}
			borderColor={$globalStyle.activeColor}
			backgroundColor={$globalStyle.activeColor}
			hoverOpacityMin={$globalStyle.theme === 'light' ? 20 : 0}
			><svelte:component
				this={$globalStyle.theme === 'dark' ? LightmodeDeco : DarkModeDeco}
				width="70%"
				height="70%"
			/></Button
		>
	{/if}
</Box>
