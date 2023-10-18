<script>
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import Label from './Label.svelte';
	import globalStyle from '../../stores/globalStyles';
	import screenSize from '../../stores/screenSize';
	import { onMount } from 'svelte';
	import { base64ToString } from '../../fn/base64ops';
	import { onDestroy } from 'svelte';
	let isAuthed = localStorage.getItem('authed');
	let lglobalStyles = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyles = gs;
	});
	let lscreenSize = $screenSize;
	screenSize.subscribe((ss) => {
		lscreenSize = ss;
	});
	let top = '4.166666666666667%';

	let fullName = base64ToString(localStorage.getItem('fullName'));
	let updatedInterval;
	onMount(() => {
		updatedInterval = setInterval(() => {
			fullName = base64ToString(localStorage.getItem('fullName'));
		}, 100);
	});

	onDestroy(() => {
		if (updatedInterval !== undefined) {
			clearInterval(updatedInterval);
		}
	});
	export { top };
</script>

<Box
	style="position: fixed; z-index: 50; border-radius: {lglobalStyles.borderRadius10}; background-color: {lglobalStyles.activeColor}00; right: -0.5% !important;"
	figmaImport={{
		desktop: {
			top: top,
			width: lscreenSize.minimized === false ? '14.5%' : 500,
			height: 61
		}
	}}
>
	<Button
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		width="100%"
		color={$globalStyle.activeMono}
		backgroundColor={$globalStyle.activeColor}
		borderColor={$globalStyle.activeColor}
		height="100%"
		left="0%"
		top="0%"
		onClick={() => {
			if (isAuthed !== 'true') {
				window.location.href = '/login';
			}
		}}
		>{#if isAuthed === 'true'}
			<Label
				text="Logged in as"
				desktopFont={lglobalStyles.smallDesktopFont}
				top="5%"
				left="5%"
				color={$globalStyle.activeMono}
			/>
			<Label
				text={localStorage.getItem('fullName') !== null ? fullName : 'No ID'}
				color={$globalStyle.activeMono}
				desktopFont={lglobalStyles.regularDesktopFont}
				top="45%"
				left="5%"
			/>
		{:else}
			<Label text="Log In" />
		{/if}
	</Button>
</Box>
