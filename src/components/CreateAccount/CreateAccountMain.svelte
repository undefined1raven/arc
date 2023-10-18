<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { getNewKey, getNewSymmetricKey } from '../../fn/crypto/getNewKey';
	import {
		ab2str,
		exportCryptoKey,
		importPrivateKey,
		importPublicKey,
		importSymmetricKey
	} from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import bcryptjs from 'bcryptjs';
	import { fade, fly } from 'svelte/transition';
	import { download } from '../../fn/download';
	import screenSize from '../../stores/screenSize';
	import domainGetter from '../../fn/domainGetter';
	import { categories, days, tasks, tasksLog } from '../../stores/dayViewSelectedDay';
	import symmetricEncrypt from '../../fn/crypto/symmetricEncrypt';
	import symmetricDecrypt from '../../fn/crypto/symmetricDecrypt';
	let stage = 'keyGen';

	let keyExport = { privateKey: '', publicKey: '', ready: false, accountID: '', simkey: '' };

	let actionButtonState = { label: 'Download Key', stage: 'download' };

	const stageToLabelProps = {
		keyGen: { text: 'Generating Keys', color: '#2400FF', backgroundColor: '#2400ff20' },
		keyExportPrep: { text: 'Prepairing Keys', color: '#2400FF', backgroundColor: '#2400ff20' },
		keyHash: { text: 'Hashing Keys', color: '#2400FF', backgroundColor: '#2400ff20' },
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
		encrypting: {
			text: 'Encrypting',
			color: '#2400ff',
			backgroundColor: '#2400ff' + '20'
		},
		error: {
			text: 'Error',
			color: $globalStyle.errorColor,
			backgroundColor: $globalStyle.errorColor + '10'
		}
	};

	async function downloadKey() {
		if (actionButtonState.stage === 'confirm') {
			stage = 'encrypting';

			importSymmetricKey(JSON.parse(keyExport.simkey)).then(async (simkey) => {
				let uplinkDoc = {};

				await symmetricEncrypt(JSON.stringify($categories), simkey).then((result) => {
					uplinkDoc['categories'] = { cipher: result.cipher, iv: result.iv };
				});
				await symmetricEncrypt(JSON.stringify($tasks), simkey).then((result) => {
					uplinkDoc['tasks'] = { cipher: result.cipher, iv: result.iv };
				});
				await symmetricEncrypt(JSON.stringify($days), simkey).then((result) => {
					uplinkDoc['days'] = { cipher: result.cipher, iv: result.iv };
				});
				await symmetricEncrypt(JSON.stringify($tasksLog), simkey).then((result) => {
					uplinkDoc['tasksLog'] = { cipher: result.cipher, iv: result.iv };
				});

				uplinkDoc['accountID'] = keyExport.accountID;
				uplinkDoc['publicKey'] = keyExport.publicKey;

				stage = 'sendCreds';

				fetch(domainGetter('/account/new'), {
					method: 'POST',
					body: JSON.stringify(uplinkDoc),
					credentials: 'include'
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
										localStorage.setItem('at', dataObj.at);
										stage = 'redirecting';
										setTimeout(() => {
											localStorage.setItem('accountID', keyExport.accountID);
											window.location.href = '/#home';
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
			});
		} else {
			if (keyExport.ready) {
				download(
					'arc_key.txt',
					JSON.stringify({
						pk: keyExport.privateKey,
						simkey: localStorage.getItem('simkey'),
						id: keyExport.accountID
					})
				);
				actionButtonState = { label: 'Confirm Download', stage: 'confirm' };
			}
		}
	}

	onMount(async () => {
		const simkey = await getNewSymmetricKey();
		exportCryptoKey(simkey).then((exportedSimkey) => {
			keyExport.simkey = exportedSimkey;
			localStorage.setItem('simkey', exportedSimkey);
		});
		getNewKey().then((keys) => {
			const privateKey = keys.privateKey;
			const publicKey = keys.publicKey;
			stage = 'keyExportPrep';
			exportCryptoKey(privateKey).then((exportedPrivateKey) => {
				exportCryptoKey(publicKey).then((exportedPublicKey) => {
					stage = 'keyHash';
					localStorage.setItem('privateKey', exportedPrivateKey);
					bcryptjs.hash(exportedPrivateKey, '$2a$10$2PXi1PwDiA8FoaVOJkk6QO', (err, hash) => {
						localStorage.setItem('accountID', hash);
						keyExport = {
							...keyExport,
							publicKey: exportedPublicKey,
							privateKey: exportedPrivateKey,
							ready: true,
							accountID: hash
						};
						stage = 'ready';
					});
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
	<Label
		borderRadius="5px"
		figmaImport={{ mobile: { top: 400, left: 30, width: 297, height: 30 } }}
		text="ARC_ID [{keyExport.accountID.substring(7, 14).toUpperCase()}]"
		color={$globalStyle.secondaryMono}
		verticalFont={$globalStyle.smallMobileFont}
	/>
	{#if stage !== 'keyGen'}
		<Button
			onClick={() => {
				downloadKey();
			}}
			figmaImport={{ mobile: { top: 459, left: 30, width: 297, height: 44 } }}
			label={actionButtonState.label}
			hoverOpacityMin={0}
		/>
	{/if}
</div>

<style>
</style>
