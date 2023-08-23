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

	const weekData = [
		{ day: 'Sun', status: 'success', routine: true, tasks: true },
		{ day: 'Mon', status: 'fail', routine: false, tasks: true },
		{ day: 'Tue', status: 'success', routine: true, tasks: true },
		{ day: 'Wen', status: 'success', routine: true, tasks: true },
		{ day: 'Thu', status: 'pending', routine: true, tasks: true },
		{ day: 'Fri', status: 'upcoming', routine: true, tasks: true },
		{ day: 'Sat', status: 'upcoming', routine: true, tasks: true }
	];

	$: colorHash = {
		success: $globalStyle.successColor,
		fail: $globalStyle.errorColor,
		pending: $globalStyle.activeColor,
		upcoming: $globalStyle.secondaryMono
	};

	onMount(() => {
		getNewKey().then((key) => {
			console.log(key);
			encrypt('hello', key).then((encrypted) => {
				console.log(encrypted);
				const cipher = encrypted.cipher;
				const iv = encrypted.iv;
				exportCryptoKey(key).then((exportedKey) => {
					console.log(exportedKey);
					bcryptjs.hash(JSON.stringify(exportedKey), 10, (err, hash) => {
						console.log(hash);
					});

					importPrivateKey(JSON.parse(exportedKey)).then((importedKey) => {
						console.log(importedKey);
						decrypt(cipher, iv, importedKey).then((decrypted) => {
							console.log(decrypted);
						});
					});
				});
			});
		});
	});

	function getRoutineTagColor(dayObj) {
		if (dayObj !== undefined) {
			if (dayObj.status === 'pending') {
				return $globalStyle.activeColor;
			} else if (dayObj.status === 'upcoming') {
				return $globalStyle.secondaryMono;
			} else if (dayObj.routine === true) {
				return $globalStyle.successColor;
			} else if (dayObj.routine === false) {
				return $globalStyle.errorColor;
			}
		}
	}

	function getTasksTagColor(dayObj) {
		if (dayObj !== undefined) {
			if (dayObj.status === 'pending') {
				return $globalStyle.activeColor;
			} else if (dayObj.status === 'upcoming') {
				return $globalStyle.secondaryMono;
			} else if (dayObj.tasks === true) {
				return $globalStyle.successColor;
			} else if (dayObj.tasks === false) {
				return $globalStyle.errorColor;
			}
		}
	}
</script>

<root>
	<Box figmaImport={{ mobile: { top: '0%', height: 19, width: '100%', left: '0%' } }}>
		<Logo top="10%" width="100%" height="90%" left="0%" color={$globalStyle.activeColor} />
		<HorizontalLine
			top="110%"
			style="background: radial-gradient(50% 50.00% at 50% 50.00%, #2400FF 0%, rgba(36, 0, 255, 0.10) 100%);"
			width="100%"
			height="10%"
			left="0%"
			color={$globalStyle.activeColor}
		/>
	</Box>
	<Box
		figmaImport={{ mobile: { top: 32, height: 322, width: 330, left: '50%' } }}
		horizontalCenter={true}
	>
		<ul class="weekList">
			{#each weekData as dayObj}
				<ListItem
					width="100%"
					height="12%"
					style="margin-bottom: 2%; margin-top: 0.5%"
					backgroundColor="{colorHash[dayObj.status]}05"
				>
					<Button
						width="98%"
						height="100%"
						borderColor={colorHash[dayObj.status]}
						backgroundColor={colorHash[dayObj.status]}
						borderRadius="3px"
						hoverOpacityMin={0}
					>
						<Label
							color={colorHash[dayObj.status]}
							width="10%"
							height="100%"
							left="2%"
							top="0%"
							style="padding-right: 2%; border-right: solid 1px {colorHash[dayObj.status]};"
							text={dayObj.day}
						/>
						<Label
							color={colorHash[dayObj.status]}
							width="24%"
							height="100%"
							top="0%"
							style="right: 2%;"
							verticalFont={$globalStyle.smallMobileFont}
							text="87% coverage"
						/>
						<Label
							width="25%"
							height="50%"
							left="18%"
							text="Routine"
							backgroundColor="{getRoutineTagColor(dayObj)}20"
							color={getRoutineTagColor(dayObj)}
							borderRadius="3px"
						/>
						<Label
							width="25%"
							height="50%"
							left="45%"
							text="Tasks"
							backgroundColor="{getTasksTagColor(dayObj)}20"
							color={getTasksTagColor(dayObj)}
							borderRadius="3px"
						/>
					</Button>
				</ListItem>
			{/each}
		</ul></Box
	>
	<Box
		figmaImport={{ mobile: { top: 355, left: '50%', width: 330, height: 170 } }}
		horizontalCenter={true}
		backgroundColor="{$globalStyle.activeColor}10"
	/>
	<Box
		figmaImport={{ mobile: { top: 533, left: '50%', width: 330, height: 40 } }}
		horizontalCenter={true}
		backgroundColor="{$globalStyle.activeColor}10"
	/>
	<Box
		figmaImport={{ mobile: { top: 582, left: '50%', width: 330, height: 44 } }}
		horizontalCenter={true}
		backgroundColor="{$globalStyle.activeColor}10"
	/>
</root>

<style>
	.weekList {
		position: absolute;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: scroll;
	}
</style>
