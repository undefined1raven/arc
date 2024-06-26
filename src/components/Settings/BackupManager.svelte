<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';
	import AutoSnapsDeco from '../deco/AutoSnapsDeco.svelte';
	import OfflineBackupDeco from '../deco/OfflineBackupDeco.svelte';
	import { fly } from 'svelte/transition';
	import { download } from '../../fn/download';
	import { processEncryptedTess } from '../Tess/fn/processEncryptedTess';
	import { tessPIN } from '../../stores/tessPIN';
	import { unwrapKey, str2ab, importSymmetricKey } from '../../fn/crypto/keyOps';
	import {
		currentDay as currentDayActual,
		exfArray as exfArrayActual,
		isTessImported,
		logs as logsActual,
		priorityArray as priorityArrayActual,
		projects as projectsActual,
		moodsArray as moodArrayActual,
		statusArray as statusArrayActual,
		projects
	} from '../Tess/TessVault';
	import { statusArray } from '../../components/Tess/TessVault';
	import { validateInput } from '../../fn/validateInput';
	import { processEncryptedSID } from '../SID/fn/processEncryptedSID';
	import { SIDs, SIDsImported } from '../SID/SIDVault';
	import symmetricDecrypt from '../../fn/crypto/symmetricDecrypt';
	import { getTessUplinkDoc } from '../../fn/TessUplinkDocPrep';
	const dispatch = createEventDispatcher();

	let fileInput;

	onMount(() => {
		setTimeout(() => {
			const reader = new FileReader();
			fileInput.addEventListener('change', (e) => {
				const fileList = e.target.files;
				reader.readAsText(fileList[0]);
				reader.addEventListener('load', (ex) => {
					try {
						let backupObj = JSON.parse(reader.result);
						if (backupObj.accountID !== undefined && backupObj.backup !== undefined) {
							if (true) {
								try {
									if ($tessPIN.ini === false && $tessPIN.pin.length !== 6) {
										throw new Error('No Tess PIN');
									}
									const parsedBackup = JSON.parse(backupObj.backup);
									const tess_simkey = JSON.parse(localStorage.getItem('tess_simkey'));
									unwrapKey(
										str2ab(tess_simkey.key),
										$tessPIN.pin,
										str2ab(tess_simkey.salt),
										str2ab(tess_simkey.iv)
									)
										.then(async (key) => {
											if (parsedBackup.tess !== undefined) {
												const tessObj = parsedBackup.tess;
												processEncryptedTess(
													tessObj.logs,
													tessObj.currentDay,
													tessObj.exfArray,
													tessObj.statusArray,
													tessObj.priorityArray,
													tessObj.projects,
													tessObj.moodArray,
													key
												).then((decryptedTessObj) => {
													if (decryptedTessObj.status === true) {
														const {
															statusArray,
															moodArray,
															priorityArray,
															exfArray,
															projects,
															currentDay,
															logs
														} = decryptedTessObj.results;
														statusArrayActual.set(statusArray);
														moodArrayActual.set(moodArray);
														priorityArrayActual.set(priorityArray);
														exfArrayActual.set(exfArray);
														projectsActual.set(projects);
														currentDayActual.set(currentDay);
														logsActual.set(logs);
														setTimeout(async () => {
															if ($tessPIN.pin !== 'none') {
																await getTessUplinkDoc(
																	$logsActual,
																	$currentDayActual,
																	$exfArrayActual,
																	$statusArrayActual,
																	$priorityArrayActual,
																	$projectsActual,
																	$moodArrayActual,
																	$tessPIN.pin,
																	true
																);
															}
														}, 50);
													}
												});
											}
										})
										.catch((e) => {
											console.log('Failed to unwrap tess simkey');
											3;
										});
									// console.log(parsedBackup);
								} catch (e) {
									console.log(e);
									throw new Error('Backup Parsing Error');
								}
							} else {
								throw new Error('Account Mismatch Detected');
							}
						} else {
							throw new Error('Invalid Backup File');
						}
					} catch (e) {}
				});
			});
		}, 40);
	});
</script>

<Button
	onClick={() => {
		const encryptedOfflineCache = localStorage.getItem('encryptedOfflineCache');
		const accountID = localStorage.getItem('accountID');
		if (encryptedOfflineCache !== null && accountID !== null) {
			download(
				`ARC_Offline_Backup[${Date.now()}].acb.txt`,
				JSON.stringify({ backup: encryptedOfflineCache, accountID: accountID })
			);
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	transitions={getTransition(1)}
	figmaImport={{ mobile: { top: 30, left: 5, width: 350, height: 59 } }}
	><Label left="2%" text="Download Offline Backup" /><OfflineBackupDeco
		left="85%"
		width="15%"
		top="10%"
		height="90%"
	/></Button
>
<Button
	backgroundColor={$tessPIN.pin.length !== 6
		? $globalStyle.inactiveColor
		: $globalStyle.activeColor}
	style="overflow: hidden;"
	borderColor={$tessPIN.pin.length !== 6 ? $globalStyle.inactiveMono : $globalStyle.activeColor}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	transitions={getTransition(2)}
	figmaImport={{ mobile: { top: 102, left: 5, width: 350, height: 59 } }}
	><Label
		width="75%"
		style="text-align: start; justify-content: start;"
		verticalFont={$tessPIN.pin.length !== 6
			? $globalStyle.mediumMobileFont
			: $globalStyle.regularMobileFont}
		color={$tessPIN.pin.length !== 6 ? $globalStyle.inactiveMono : $globalStyle.activeMono}
		left="2%"
		text="Restore From Offline Backup {$tessPIN.pin.length !== 6
			? ' [Unlock Tess to continue]'
			: ''}"
	/><OfflineBackupDeco
		color={$tessPIN.pin.length !== 6 ? $globalStyle.inactiveMono : $globalStyle.activeColor}
		left="85%"
		width="15%"
		top="0%"
		height="90%"
		style="transform: rotate(-180deg);"
	/>
	<input
		style="width: 100%; height: 100%; opacity: 0.002;"
		bind:this={fileInput}
		class="keyInput"
		type="file"
	/>
</Button>
<Label
	transitions={getTransition(3)}
	text="Loading this backup will override any newer data"
	figmaImport={{ mobile: { top: 174, width: 350, left: '50%', height: 42 } }}
	verticalFont={$globalStyle.smallMobileFont}
	backgroundColor="{$globalStyle.errorColor}20"
	color={$globalStyle.errorColor}
	horizontalCenter={true}
	borderRadius={$globalStyle.borderRadius}
/>
<Label
	text="Auto Snaps"
	style="padding-left: 2%; text-align: start; justify-content: start;"
	transitions={getTransition(4)}
	horizontalCenter={true}
	backgroundColor="{$globalStyle.activeColor}20"
	borderRadius={$globalStyle.borderRadius}
	figmaImport={{ mobile: { top: 229, width: 350, left: '50%', height: 57 } }}
	><AutoSnapsDeco left="70%" width="30%" height="85%" /></Label
>
<Button
	onClick={() => {
		dispatch('onBack');
	}}
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '15%' }
		}
	}}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 574, left: 13, width: 334, height: 44 } }}
	label="Back"
/>
