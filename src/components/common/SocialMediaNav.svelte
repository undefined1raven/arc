<script>
	import DiscordLogo from '../deco/DiscordLogo.svelte';
	import EmailDeco from '../deco/EmailDeco.svelte';
	import Button from './Button.svelte';
	import Box from './Box.svelte';
	import globalStyle from '../../stores/globalStyles';
	import screenSize from '../../stores/screenSize';
	import isMobile from '../../fn/isMobile';
	import Label from './Label.svelte';
	let lscreenSize = $screenSize;
	let lglobalStyle = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyle = gs;
	});
	let width = 156;
	let style = '';
	let showCopiedToClipboard = false;
	screenSize.subscribe((ss) => {
		lscreenSize = ss;
		if (lscreenSize.minimized === true) {
			width = 450;
		} else {
			width = 156;
		}
	});
	export { style };
</script>

{#if !isMobile()}
	<Box
		figmaImport={{ desktop: { width: width, height: 39, top: 1027, left: '50%' } }}
		horizontalCenter={true}
		{style}
	>
		<a href="https://discord.gg/U7D7h8KJEh" target="_blank">
			<Button
				hoverOpacityMin={0}
				hoverOpacityMax={20}
				borderColor="#00000000"
				width="50%"
				backgroundColor={$globalStyle.activeColor}
				height="100%"
				left="0%"
				top="0%"><DiscordLogo color={lglobalStyle.activeColor} height="50%" /></Button
			></a
		>
		<Button
			onClick={() => {
				showCopiedToClipboard = true;
				if (navigator.clipboard !== undefined) {
					navigator.clipboard.writeText('team.lifewire@gmail.com');
					setTimeout(() => {
						showCopiedToClipboard = false;
					}, 3000);
				}
			}}
			backgroundColor={$globalStyle.activeColor}
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			borderColor="#00000000"
			width="50%"
			height="100%"
			left="50%"
			top="0%"><EmailDeco color={$globalStyle.activeColor} height="50%" /></Button
		>
		<Label
			show={showCopiedToClipboard}
			text="Copied to clipboard"
			color={lglobalStyle.activeMono}
			desktopFont={lglobalStyle.smallDesktopFont}
			top="-90%"
			backgroundColor="{lglobalStyle.activeColor}30"
			backdropFilter="blur(10px);"
			width="100%"
			height="80%"
			style="transition: all linear 0.1s; white-space: nowrap;"
			borderRadius={lglobalStyle.borderRadius}
		/>
	</Box>
{/if}

<style>
</style>
