<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import TessDeco from '../deco/TessDeco.svelte';
	import NumericalInput from '../common/NumericalInput.svelte';
	import PinDeco from '../deco/PINDeco.svelte';
	import Input from '../common/Input.svelte';
	import { onMount } from 'svelte';
	import { getNewSymmetricKey } from '../../fn/crypto/getNewKey';
	import { tessPIN } from '../../stores/tessPIN';
	import { ab2str, str2ab, unwrapKey, wrapCryptoKey } from '../../fn/crypto/keyOps';
	import logout from '../../fn/logout';
	import { download } from '../../fn/download';
	import { getAccountKeyPayload } from '../../fn/getAccountKeyPayload';
	import { processEncryptedTess } from './fn/processEncryptedTess';
	import {
		currentDay,
		exfArray,
		isTessImported,
		logs,
		priorityArray,
		projects,
		statusArray
	} from './TessVault';
	import Page from '../../routes/+page.svelte';
	import { validateInput } from '../../fn/validateInput';
	import isMobile from '../../fn/isMobile';

	let createPIN = '';
	let createConfirmPIN = '';

	let mode = 'auth'; // auth | create | create-confirm | fail | unwrapping
	let input = '';

	async function onInputChange() {
		if (input.toString().length === 6) {
			if (mode === 'create') {
				createPIN = input;
				input = '';
				mode = 'create-confirm';
			}
			if (mode === 'create-confirm') {
				createConfirmPIN = input;
				input = '';
				if (createConfirmPIN === createPIN) {
					const tess_simkey = await getNewSymmetricKey();
					wrapCryptoKey(tess_simkey, createConfirmPIN)
						.then((res) => {
							localStorage.setItem(
								'tess_simkey',
								JSON.stringify({
									key: ab2str(res.wrappedKey),
									salt: ab2str(res.salt),
									iv: ab2str(res.iv)
								})
							);
							download(
								`updated_arc_key-B${Date.now().toString().substring(5, 10)}.key.txt`,
								getAccountKeyPayload()
							);
							tessPIN.set({ pin: createConfirmPIN, tx: Date.now(), ini: true });
						})
						.catch((e) => {
							console.log(e);
						});
				}
			}
			if (mode === 'auth') {
				try {
					const tess_simkey = JSON.parse(localStorage.getItem('tess_simkey'));
					unwrapKey(
						str2ab(tess_simkey.key),
						input,
						str2ab(tess_simkey.salt),
						str2ab(tess_simkey.iv)
					)
						.then(async (key) => {
							tessPIN.set({ pin: input, tx: Date.now(), ini: true });
							const currentCache = JSON.parse(localStorage.getItem('encryptedOfflineCache'));
							if (
								currentCache.tess !== undefined &&
								validateInput(
									['logs', 'currentDay', 'exfArray', 'statusArray', 'priorityArray', 'projects'],
									currentCache.tess
								) === true
							) {
								const decryptedObj = await processEncryptedTess(
									currentCache.tess.logs,
									currentCache.tess.currentDay,
									currentCache.tess.exfArray,
									currentCache.tess.statusArray,
									currentCache.tess.priorityArray,
									currentCache.tess.projects,
									key
								);
								if (decryptedObj.status === true && decryptedObj.results !== undefined) {
									logs.set(decryptedObj.results.logs);
									currentDay.set(decryptedObj.results.currentDay);
									exfArray.set(decryptedObj.results.exfArray);
									statusArray.set(decryptedObj.results.statusArray);
									priorityArray.set(decryptedObj.results.priorityArray);
									projects.set(decryptedObj.results.projects);
									isTessImported.set(true);
								}
							} else {
								isTessImported.set(true);
							}
						})
						.catch((e) => {
							input = '';
							console.log(e);
						});
				} catch (e) {
					mode = 'fail';
				}
			}
		}
	}

	$: onInputChange(input);

	onMount(() => {
		tessPIN.set({ ini: false, tx: 0, pin: '' });
		const wrappedTessSimkey = localStorage.getItem('tess_simkey');
		if (wrappedTessSimkey === null) {
			mode = 'fail';
			localStorage.setItem('tess_simkey', 'none');
		} else if (wrappedTessSimkey === 'none') {
			mode = 'create';
		} else {
			try {
				const tess_simkey = JSON.parse(localStorage.getItem('tess_simkey'));
				if (
					tess_simkey.key !== undefined &&
					tess_simkey.iv !== undefined &&
					tess_simkey.salt !== undefined
				) {
					mode = 'auth';
				} else {
					mode = 'fail';
				}
			} catch (e) {
				mode = 'fail';
			}
		}
	});
</script>

{#if mode === 'create' || mode === 'create-confirm'}
	<Label
		text="{mode === 'create' ? 'Please enter a 6 digit PIN' : 'Please re-enter the 6 digit PIN'} "
		color={$globalStyle.activeColor}
		backgroundColor="{$globalStyle.activeColor}10"
		borderRadius={$globalStyle.borderRadius}
		width={isMobile() === true ? '90%' : '20%'}
		desktopFont={$globalStyle.mediumDesktopFont}
		verticalFont={$globalStyle.mediumMobileFont}
		height="5%"
		top={isMobile() === true ? '55%' : '20%'}
		left="50%"
		horizontalCenter={true}
	/>
{/if}

{#if mode === 'fail'}
	<Label
		text="No PIN Detected"
		color={$globalStyle.errorColor}
		backgroundColor="{$globalStyle.errorColor}20"
		borderRadius={$globalStyle.borderRadius}
		width={isMobile() === true ? '80%' : '20%'}
		height={isMobile() === true ? '5%' : '5%'}
		top={isMobile() === true ? '20%' : '35%'}
		desktopFont={$globalStyle.mediumDesktopFont}
		left="50%"
		horizontalCenter={true}
	/>
	<Button
		onClick={() => {
			mode = 'create';
		}}
		label="Set New PIN"
		style="text-align: center;"
		width={isMobile() === true ? '80%' : '20%'}
		left="50%"
		horizontalCenter={true}
		top={isMobile() === true ? '28%' : '42%'}
		desktopFont={$globalStyle.mediumDesktopFont}
		height={isMobile() === true ? '8%' : '5%'}
	/>
	<Button
		onClick={logout}
		label="Try a different account key"
		style="text-align: center;"
		width={isMobile() === true ? '80%' : '20%'}
		left="50%"
		horizontalCenter={true}
		desktopFont={$globalStyle.mediumDesktopFont}
		top={isMobile() === true ? '39%' : '49%'}
		height={isMobile() === true ? '8%' : '5%'}
	/>
{/if}

{#if isMobile()}
	<Box
		figmaImport={{ mobile: { top: 31, left: '50%', width: 344, height: 79 } }}
		backgroundColor="{$globalStyle.activeColor}10"
		horizontalCenter={true}
	>
		<Label
			text="TESS-AVN"
			style="letter-spacing: 0.4vh;"
			color={$globalStyle.activeColor}
			left="2%"
		/>
		<TessDeco left="74%" width="25%" height="100%" />
	</Box>
	{#if mode === 'auth' || mode === 'create' || mode === 'create-confirm'}
		<PinDeco
			digits={input.toString().length}
			width="40%"
			height="70%"
			left="50%"
			style="transform: translate(-50%);"
		/>
	{/if}
	{#if mode !== 'fail'}
		<NumericalInput
			autofocus={true}
			bind:value={input}
			width="100%"
			height="80%"
			top="18%"
			style="opacity: 0.001; z-index: 150;"
		/>
	{/if}
{/if}

{#if isMobile() === false}
	{#if mode !== 'fail'}
		<NumericalInput
			autofocus={true}
			bind:value={input}
			width="70%"
			height="70%"
			top="18%"
			style="opacity: 0.001; z-index: 150;"
		/>
	{/if}
	{#if mode === 'auth' || mode === 'create' || mode === 'create-confirm'}
		<PinDeco
			digits={input.toString().length}
			width="20%"
			height="30%"
			left="50%"
			style="transform: translate(-50%);"
		/>
	{/if}
{/if}
