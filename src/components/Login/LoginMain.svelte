<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import bcryptjs from 'bcryptjs';
	import { fade, fly } from 'svelte/transition';

	let fileInput;

	onMount(() => {
		setTimeout(() => {
			const reader = new FileReader();
			fileInput.addEventListener('change', (e) => {
				const fileList = e.target.files;
				reader.readAsText(fileList[0]);
				reader.addEventListener('load', (ex) => {
					console.log(reader.result);
				});
			});
		}, 10);
	});
</script>

<div>
	<Box
		transitions={{ in: { func: fly, options: { duration: 700, y: '-10%' } } }}
		figmaImport={{ mobile: { top: '0%', left: '0%', width: '100%', height: 103 } }}
	>
		<Logo width="50%" height="60%" />
		<HorizontalLine
			style="background: radial-gradient(50% 50.00% at 50% 50.00%, #2400FF 0%, rgba(36, 0, 255, 0.10) 100%);"
			top="100%"
		/>
	</Box>
	<Box
		figmaImport={{ mobile: { top: 139, left: '50%', width: 250, height: 30 } }}
		backgroundColor="{$globalStyle.activeColor}20"
		horizontalCenter={true}
		transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
		><Label width="100%" height="100%" color={$globalStyle.activeMono} text="Enter Key" /></Box
	>
	<Box
		figmaImport={{ mobile: { top: 195, left: '50%', width: 250, height: 250 } }}
		backgroundColor="{$globalStyle.activeColor}20"
		horizontalCenter={true}
		transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
		><Button
			style="overflow: hidden;"
			onClick={() => {
				var eventObj = document.createEvent('MouseEvents');
				eventObj.initEvent('click', true, true);
				fileInput.dispatchEvent(eventObj);
			}}
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={10}
			borderRadius="5px"
		>
			<input bind:this={fileInput} class="keyInput" type="file" /></Button
		>
	</Box>
	<Label
		figmaImport={{ mobile: { top: 469, left: '50%', width: 250, height: 44 } }}
		horizontalCenter={true}
		text="or"
	/>
	<Button
		onClick={() => {
			window.location.href = '/create';
		}}
		figmaImport={{ mobile: { top: 534, left: '50%', width: 250, height: 44 } }}
		horizontalCenter={true}
		label="Create Account"
	/>
</div>

<style>
	.keyInput {
		position: absolute;
		display: none;
	}
</style>
