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
	import SidDeco from '../components/deco/SIDDeco.svelte';
	import { tessPIN } from '../stores/tessPIN';
	import { onMount } from 'svelte';
	import { SIDs } from '../components/SID/SIDVault';
	import isMobile from '../fn/isMobile';
	import StarDeco from '../components/deco/StarDeco.svelte';
	import { allowMenuSwipe } from '../stores/allowMenuSwpite';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	touchMove.subscribe((tm) => {
		let swipeDelta = $touchStart[0].clientX - tm[0].clientX;
		let swipeDeltaY = $touchStart[0].clientY - tm[0].clientY;
		if (
			$allowMenuSwipe === true &&
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

	globalStyle.subscribe((gs) => {
		let keys = Object.keys(gs);
		for (let ix = 0; ix < keys.length; ix++) {
			document.documentElement.style.setProperty(`--${keys[ix]}`, gs[keys[ix]]);
		}
	});

	injectSpeedInsights();

	onMount(() => {
		setTimeout(() => {
			document.documentElement.style.transition = 'background-color linear 0.1s';
		}, 50);
	});

	const pageBackgroudMap = {
		arc: '#010007',
		sid: '#040007',
		tess: '#010007',
		star: 'linear-gradient(162deg, #03000A 4.7%, #050313 15.9%, #080313 38.7%, #07000E 59.05%, #03000A 100.06%)'
	};

	activeApp.subscribe((aa) => {
		switch (aa) {
			case 'tess':
				globalStyleOverride(appColors.tess);
				document.documentElement.style.background = pageBackgroudMap.tess;
				break;
			case 'arc':
				globalStyleOverride(appColors.arc);
				document.documentElement.style.background = pageBackgroudMap.arc;
				break;
			case 'sid':
				globalStyleOverride(appColors.sid);
				document.documentElement.style.background = pageBackgroudMap.sid;
				break;
			case 'star':
				globalStyleOverride(appColors.star);
				document.documentElement.style.background = pageBackgroudMap.star;
				document.documentElement.style.backgroundRepeat = 'no-repeat';
				document.documentElement.style.backgroundAttachment = 'fixed';
				break;

			default:
				globalStyleOverride(appColors.arc);
				document.documentElement.style.background = pageBackgroudMap.arc;
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

{#if isMobile() === true}
	{#if window.location.pathname !== '/login' && window.location.pathname !== '/create' && window.location.pathname !== '/remote'}
		{#if $updateLabel === '[Syncing]' && isMobile() === true}
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
			{#if $activeApp === 'sid'}
				<SidDeco width="20%" height="100%" />
			{/if}
			{#if $activeApp === 'tess'}
				<TessDeco width="20%" height="100%" />
			{/if}
			{#if $activeApp === 'star'}
				<StarDeco color={$globalStyle.activeMono} width="20%" height="100%" />
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
			<Label
				verticalFont={$globalStyle.smallMobileFont}
				text="B-Tiger 221"
				height="100%"
				left="0%"
				color={$globalStyle.inactiveColor}
			/>
			<!-- {#if $updateLabel !== 'none'}
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
		{/if} -->
		</Box>
	{/if}
{/if}
