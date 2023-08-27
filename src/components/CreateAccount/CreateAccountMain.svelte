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
	import { download } from '../../fn/download';
	import screenSize from '../../stores/screenSize';
	import domainGetter from '../../fn/domainGetter';
	let stage = 'keyGen';

	let keyExport = { key: '', ready: false, hash: '' };

	let actionButtonState = { label: 'Download Key', stage: 'download' };

	const stageToLabelProps = {
		keyGen: { text: 'Generating Key', color: '#2400FF', backgroundColor: '#2400ff20' },
		keyExportPrep: { text: 'Prepairing Key', color: '#2400FF', backgroundColor: '#2400ff20' },
		keyHash: { text: 'Hashing Key', color: '#2400FF', backgroundColor: '#2400ff20' },
		ready: {
			text: 'Ready',
			color: $globalStyle.successColor,
			backgroundColor: $globalStyle.successColor + '10'
		},
		sendCreds: {
			text: 'Sending Credentials',
			color: '#2400ff',
			backgroundColor: '#2400ff' + '20'
		},
		redirecting: {
			text: 'Redirecting /|/',
			color: $globalStyle.successColor,
			backgroundColor: $globalStyle.successColor + '10'
		},
		error: {
			text: 'Error',
			color: $globalStyle.errorColor,
			backgroundColor: $globalStyle.errorColor + '10'
		}
	};

	function downloadKey() {
		if (actionButtonState.stage === 'confirm') {
			stage = 'sendCreds';
			fetch(domainGetter('/account/new'), {
				method: 'POST',
				body: JSON.stringify({ hash: keyExport.hash })
			})
				.then((res) => {
					res.body
						.getReader()
						.read()
						.then((data) => {
							const dataString = new TextDecoder('utf-8').decode(data.value);
							try {
								const dataObj = JSON.parse(dataString);
								if (dataObj.success) {
									stage = 'redirecting';
									setTimeout(() => {
										window.location.href = '/';
									}, 300);
								} else {
									stage = 'ready';
								}
							} catch (e) {
								stage = 'error';
							}
						});
				})
				.catch((e) => {
					stage = 'error';
				});
		} else {
			if (keyExport.ready) {
				download('arc_key.txt', keyExport.key);
				actionButtonState = { label: 'Confirm Download', stage: 'confirm' };
			}
		}
	}

	onMount(() => {
		getNewKey().then((key) => {
			stage = 'keyExportPrep';
			exportCryptoKey(key).then((exportedKey) => {
				stage = 'keyHash';
				console.log('what');
				localStorage.setItem('key', exportedKey);
				bcryptjs.hash(JSON.stringify(exportedKey), 10, (err, hash) => {
					keyExport = { key: exportedKey, ready: true, hash: hash };
					stage = 'ready';
				});
			});
		});
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
	<Label
		verticalFont={$globalStyle.mediumMobileFont}
		horizontalCenter={true}
		color={$globalStyle.activeMono}
		borderRadius="5px"
		style="padding-left: 2%; padding-right: 2%;"
		figmaImport={{
			mobile: { top: 172, left: '50%', width: 297 - 0.04 * $screenSize.width, height: 84 }
		}}
		text="This app uses key-based authentication to encrypt your data and to identify you"
		backgroundColor="{$globalStyle.activeColor}10"
	/>
	<Label
		verticalFont={$globalStyle.mediumMobileFont}
		horizontalCenter={true}
		color={$globalStyle.activeMono}
		borderRadius="5px"
		style="padding-left: 2%; padding-right: 2%;"
		figmaImport={{
			mobile: { top: 264, left: '50%', width: 297 - 0.04 * $screenSize.width, height: 84 }
		}}
		text="The key is stored locally and never leaves your device"
		backgroundColor="{$globalStyle.activeColor}10"
	/>
	<Label
		color={$globalStyle.activeMono}
		borderRadius="5px"
		figmaImport={{ mobile: { top: 362, left: 30, width: 97, height: 30 } }}
		text="Status"
		backgroundColor="{$globalStyle.activeColor}10"
	/>
	<Label
		color={$globalStyle.activeMono}
		borderRadius="5px"
		figmaImport={{ mobile: { top: 362, left: 142, width: 185, height: 30 } }}
		text="Creating Key"
		backgroundColor="{$globalStyle.activeColor}10"
		{...stageToLabelProps[stage]}
	/>
	<Button
		onClick={() => {
			downloadKey();
		}}
		figmaImport={{ mobile: { top: 459, left: 30, width: 297, height: 44 } }}
		label={actionButtonState.label}
		hoverOpacityMin={0}
	/>
</div>

<style>
</style>
