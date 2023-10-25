<script>
	import { fade, fly } from 'svelte/transition';
	import { activeApp } from '../stores/activeApp';
	import screenSize from '../stores/screenSize';
	import { touchEnd, touchStart, touchMove } from '../stores/touchGestures';
	import Logo from '../components/deco/Logo.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import globalStyle from '../stores/globalStyles';
	import { updateLabel } from '../stores/updateLabel';
	import NetworkIndicator from '../components/Home/NetworkIndicator.svelte';
	import Label from '../components/common/Label.svelte';
	import Box from '../components/common/Box.svelte';
	import KeysIndicator from '../components/Home/KeysIndicator.svelte';
	import SyncingDeco from '../components/deco/SyncingDeco.svelte';
	import { appColors } from '../config/appColors';
	import TessDeco from '../components/deco/TessDeco.svelte';
	touchMove.subscribe((tm) => {
		let swipeDelta = $touchStart[0].clientX - tm[0].clientX;
		let swipeDeltaY = $touchStart[0].clientY - tm[0].clientY;
		if (
			swipeDelta < 0 &&
			Math.abs(swipeDelta) > 0.3 * $screenSize.width &&
			Math.abs(swipeDeltaY) < 0.08 * $screenSize.height
		) {
			activeApp.set('menu');
		}
	});

	function globalStyleOverride(obj) {
		globalStyle.update((gs) => {
			return { ...gs, ...obj };
		});
	}

	activeApp.subscribe((aa) => {
		switch (aa) {
			case 'tess':
				globalStyleOverride(appColors.tess);
				break;
			case 'arc':
				globalStyleOverride(appColors.arc);
			case 'sid':
				globalStyleOverride(appColors.sid);
			default:
				globalStyleOverride(appColors.arc);
				break;
		}
	});
</script>

<slot />
<svelte:window
	on:touchend={(e) => {
		touchEnd.set(e.touches);
	}}
	on:touchmove={(e) => {
		touchMove.set(e.touches);
	}}
	on:touchstart={(e) => {
		touchStart.set(e.touches);
	}}
/>
{#if window.location.pathname !== '/login' && window.location.pathname !== '/create'}
	{#if $updateLabel === '[Syncing]'}
		<Box
			width="100%"
			height="95%"
			top="5%"
			backgroundColor="#000000CC"
			backdropFilter="blur(5px)"
			style="z-index: 500;"
			left="0%"><SyncingDeco width="50%" height="50%" color={$globalStyle.activeColor} /></Box
		>
	{/if}
	<Box
		transitions={{
			in: { func: fly, options: { duration: 400, y: '-2%' } }
		}}
		figmaImport={{ mobile: { top: '0%', height: 19, width: '100%', left: '0%' } }}
	>
		{#if $activeApp === 'arc'}
			<Logo top="10%" width="100%" height="90%" left="0%" color={$globalStyle.activeColor} />
		{/if}
		{#if $activeApp === 'tess'}
			<TessDeco width="20%" height="100%" />
		{/if}
		{#if $activeApp === 'menu'}
			<Label
				text="---SELECT---"
				color={$globalStyle.activeColor}
				verticalFont={$globalStyle.mediumMobileFont}
			/>
		{/if}
		<HorizontalLine
			top="110%"
			style="background: radial-gradient(50% 50.00% at 50% 50.00%, {$globalStyle.activeColor} 0%, {$globalStyle.activeColor}20 100%);"
			width="100%"
			height="10%"
			left="0%"
			color={$globalStyle.activeColor}
		/>
		<NetworkIndicator />
		<KeysIndicator />
		{#if $updateLabel !== 'none'}
			<div out:fade={{ duration: 200 }}>
				<Box
					transitions={{
						in: { func: fly, options: { duration: 400, x: '-20%' } },
						out: { func: fly, options: { duration: 400, x: '-20%' } }
					}}
					top="0%"
					width="30%"
					height="100%"
					left="0%"
				>
					<Label
						left="0%"
						width="100%"
						verticalFont={$globalStyle.mediumMobileFont}
						height="100%"
						borderRadius="5px"
						style="border-bottom-left-radius: 0px; border-top-left-radius: 0px;"
						backgroundColor="{$globalStyle.activeColor}20"
						color={$globalStyle.activeColor}
						text={$updateLabel}
					/>
				</Box>
			</div>
		{/if}
	</Box>
{/if}
