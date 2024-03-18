<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { exportCryptoKey, importPrivateKey, str2ab } from '../../fn/crypto/keyOps';
	import decrypt from '../../fn/crypto/decrypt';
	import { fade, fly } from 'svelte/transition';
	import domainGetter from '../../fn/domainGetter';
	import isMobile from '../../fn/isMobile';
	import VerticalLine from '../common/VerticalLine.svelte';
	import { getDesktopTransition, getTransition } from '../../fn/getTransisitions';
	import List from '../common/List.svelte';
	import { updateLabel } from '../../stores/updateLabel';
	import DecoX from '../deco/DecoX.svelte';
	import KeyDeco from '../deco/KeyDeco.svelte';
	import PasskeyDeco from '../deco/PasskeyDeco.svelte';
	import { passkeySetup } from './passkeySetup';
	import { startRegistration } from '@simplewebauthn/browser';
	let desktopLogArray = [{ label: 'Key Standby', color: $globalStyle.activeColor }];
	let showDecoGrid = false;
	let fileInput;
	let authStatus = {
		label: 'Awaiting Key',
		bkgColor: `${$globalStyle.activeColor}20`,
		color: $globalStyle.activeMono
	};

	function setAuthStatusToDefault() {
		authStatus = {
			label: 'Standing By for Key',
			bkgColor: `${$globalStyle.activeColor}20`,
			color: $globalStyle.activeMono
		};
	}

	function setAuthStatusToInvalidKey() {
		authStatus = {
			label: 'Invalid Key',
			bkgColor: `${$globalStyle.errorColor}20`,
			color: $globalStyle.errorColor
		};
		setTimeout(() => {
			setAuthStatusToDefault();
		}, 3000);
	}

	function updateDesktopLogs(label, color) {
		desktopLogArray = [...desktopLogArray, { label: label, color: color }];
	}

	function resetDesktopLogs() {
		desktopLogArray = [{ label: 'Key Stand-by', color: $globalStyle.activeColor }];
	}

	onMount(() => {
		setTimeout(() => {
			showDecoGrid = true;
		}, 150);
		setTimeout(() => {
			const reader = new FileReader();
			fileInput.addEventListener('change', (e) => {
				const fileList = e.target.files;
				reader.readAsText(fileList[0]);
				updateDesktopLogs('Reading Key', $globalStyle.activeColor);
				reader.addEventListener('load', (ex) => {
					try {
						let accountKey = JSON.parse(reader.result);
						if (
							accountKey.pk === undefined ||
							accountKey.id === undefined ||
							accountKey.simkey === undefined ||
							accountKey.tess_simkey === undefined
						) {
							updateDesktopLogs('Invalid Key', $globalStyle.errorColor);
							setAuthStatusToInvalidKey();
						} else {
							localStorage.setItem('privateKey', accountKey.pk);
							localStorage.setItem('simkey', accountKey.simkey);
							localStorage.setItem('accountID', accountKey.id);
							localStorage.setItem('tess_simkey', accountKey.tess_simkey);
							authStatus.label = '[Requesting Challenge]';
							updateDesktopLogs('Key is valid', $globalStyle.successColor);
							updateDesktopLogs('Requesting Challenge', $globalStyle.successColor);
							fetch(domainGetter('/auth/requestChallenge'), {
								credentials: 'include',
								method: 'POST',
								body: JSON.stringify({ accountID: accountKey.id })
							}).then((res) => {
								res.json().then((data) => {
									if (data.error !== undefined) {
										authStatus = {
											label: 'Challenge Failed',
											bkgColor: `${$globalStyle.errorColor}20`,
											color: $globalStyle.errorColor
										};
										updateDesktopLogs('Challenge Failed', $globalStyle.errorColor);
										setTimeout(() => {
											setAuthStatusToDefault();
										}, 200);
									} else {
										authStatus.label = '[Solving Challenge]';
										updateDesktopLogs('[Solving Challenge]', $globalStyle.activeLightColor);
										try {
											if (data.success === true && data.challenge !== undefined) {
												updateDesktopLogs('Challenge Succeeded', $globalStyle.successColor);
												importPrivateKey(JSON.parse(accountKey.pk)).then((privateKey) => {
													updateDesktopLogs('Importing Config', $globalStyle.successColor);
													decrypt(str2ab(data.challenge), privateKey)
														.then((solution) => {
															fetch(
																domainGetter(
																	`/auth/verifySolution?accountID=${accountKey.id}&solution=${solution}&CID=${data.CID}`
																),
																{
																	method: 'GET',
																	credentials: 'include'
																}
															).then((res) => {
																res
																	.json()
																	.then((data) => {
																		if (data.error === undefined && data.success === true) {
																			window.location.href = '/';
																		} else {
																			authStatus = {
																				label: 'Challenge Failed',
																				bkgColor: `${$globalStyle.errorColor}20`,
																				color: $globalStyle.errorColor
																			};
																			setTimeout(() => {
																				setAuthStatusToDefault();
																			}, 2000);
																		}
																	})
																	.catch((e) => {
																		authStatus = {
																			label: 'Something went wrong',
																			bkgColor: `${$globalStyle.errorColor}20`,
																			color: $globalStyle.errorColor
																		};
																		setTimeout(() => {
																			setAuthStatusToDefault();
																		}, 2000);
																	});
															});
														})
														.catch((e) => {
															authStatus = {
																label: 'Challenge Failed',
																bkgColor: `${$globalStyle.errorColor}20`,
																color: $globalStyle.errorColor
															};
															setTimeout(() => {
																setAuthStatusToDefault();
															}, 200);
														});
												});
											}
										} catch (e) {
											setAuthStatusToInvalidKey();
										}
									}
								});
							});
						}
					} catch (e) {
						updateDesktopLogs('Invalid Key', $globalStyle.errorColor);
						setAuthStatusToInvalidKey();
					}
				});
			});
		}, 10);
	});
</script>

{#if isMobile() === true}
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
			figmaImport={{ mobile: { top: 120, left: 55, width: 145, height: 14 } }}
			transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
			><Label
				width="100%"
				height="100%"
				color={authStatus.color}
				borderRadius="3px"
				verticalFont={$globalStyle.smallMobileFont}
				backgroundColor={authStatus.bkgColor}
				text={authStatus.label}
			/></Box
		>
		<Box
			figmaImport={{ mobile: { top: 139, left: '50%', width: 250, height: 290 } }}
			backgroundColor="{$globalStyle.activeColor}00"
			horizontalCenter={true}
			transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
		>
			<Label transitions={getTransition(2)} text="Enter Private Key" top="35%" />
			<Box transitions={getTransition(3)} top="45%" width="40%" height="20%"
				><KeyDeco color={$globalStyle.activeMono} /></Box
			>
			<Label
				transitions={getTransition(4)}
				text="File ending in .key.txt"
				verticalFont={$globalStyle.smallMobileFont}
				top="75%"
			/>
			<Button
				width="100%"
				height="100%"
				hoverOpacityMin={10}
				hoverOpacityMax={10}
				borderRadius={$globalStyle.borderRadius}
			>
				<input bind:this={fileInput} class="keyInput" type="file" /></Button
			>
		</Box>
		<!-- <Box
			figmaImport={{ mobile: { top: 305, left: '50%', width: 250, height: 139 } }}
			transitions={{ in: { func: fly, options: { delay: 50, duration: 350, y: '5%' } } }}
			horizontalCenter={true}
		>
			<Label text="Use a Passkey" top="35%" />
			<Box width="45%" top="55%" height="20%"
				><PasskeyDeco width="100%" height="100%" color={$globalStyle.activeMono} /></Box
			>
			<Button
				onClick={() => {
					console.log('here')
					passkeySetup();
				}}
				width="100%"
				height="100%"
				hoverOpacityMin={10}
				hoverOpacityMax={10}
				borderRadius={$globalStyle.borderRadius}
			/>
		</Box> -->
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
{/if}

{#if isMobile() === false}
	{#if showDecoGrid}
		<Box
			style="z-index: -1;"
			backgroundColor="{$globalStyle.activeColor}00"
			transitions={{ in: { func: fade, options: { y: '-1%', duration: 500 } } }}
			figmaImport={{ desktop: { top: 0, left: 0, width: '100%', height: '100%' } }}
		>
			<List direction="row" width="100%" height="100%" style="flex-wrap: wrap; overflow: hidden;">
				{#each new Array(270) as x, ix}
					<ListItem marginBottom="3%" width="5vh" height="5vh" style="min-width: 5%;">
						<DecoX
							style="transform: rotate(-45deg);"
							width="100%"
							height="100%"
							color={$globalStyle.activeColor}
							opacity={0.5}
						/>
					</ListItem>
				{/each}
			</List>
		</Box>
	{/if}
	<VerticalLine
		color={$globalStyle.activeColor}
		style="border-radius: 15px;"
		figmaImport={{ desktop: { top: 30, left: 37, width: 2, height: 1020 } }}
	/>
	<VerticalLine
		color={$globalStyle.activeColor}
		style="border-radius: 15px;"
		figmaImport={{ desktop: { top: 30, left: 30, width: 1, height: 1020 } }}
	/>
	<Box figmaImport={{ desktop: { top: 30, left: 51, width: 143, height: 50 } }}>
		<Logo width="100%" height="100%" top="0%" />
	</Box>
	<List figmaImport={{ desktop: { top: 104, left: 37, width: 197, height: 946 } }}>
		{#each desktopLogArray as log, ix}
			<ListItem marginBottom="3%" transitions={getTransition(ix, 20)} width="100%" height="3%"
				><Label
					width="100%"
					height="100%"
					backgroundColor="{log.color}10"
					borderRadius={$globalStyle.borderRadius}
					style="text-align: start; justify-content: start; padding-left: 10%; border-top-right-radius: {$globalStyle.borderRadius10}; border-bottom-right-radius: {$globalStyle.borderRadius10};"
					desktopFont={$globalStyle.smallDesktopFont}
					text={log.label}
					color={log.color}
				/></ListItem
			>
		{/each}
	</List>
	<Label
		figmaImport={{ desktop: { top: 363, left: '50%', width: 297, height: 35 } }}
		transitions={getTransition(1)}
		text={authStatus.label}
		horizontalCenter={true}
		desktopFont={$globalStyle.mediumDesktopFont}
		borderRadius={$globalStyle.borderRadius}
		backgroundColor={authStatus.bkgColor}
		color={authStatus.color}
	/>
	<Label
		figmaImport={{ desktop: { top: 735, left: '50%', width: 297, height: 35 } }}
		text="or"
		transitions={getTransition(3)}
		horizontalCenter={true}
		desktopFont={$globalStyle.mediumDesktopFont}
	/>
	<Box
		figmaImport={{ desktop: { top: 427, left: '50%', width: 297, height: 297 } }}
		backgroundColor="{$globalStyle.activeColor}20"
		horizontalCenter={true}
		transitions={getTransition(2)}
		><Button
			style="overflow: hidden;"
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={10}
			borderRadius="5px"
		>
			<input bind:this={fileInput} class="keyInput" type="file" /></Button
		>
	</Box>
	<Button
		onClick={() => {
			window.location.href = '/create';
		}}
		transitions={getTransition(4)}
		figmaImport={{ desktop: { top: 784, left: '50%', width: 297, height: 45 } }}
		label="Create Account"
		horizontalCenter={true}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		desktopFont={$globalStyle.mediumDesktopFont}
	/>
{/if}

<style>
	.keyInput {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.001;
	}
</style>
