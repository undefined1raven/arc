<script lang="ts">
	import HomeMain from '../components/Home/HomeMain.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { ab2str, importPublicKey, importSymmetricKey, str2ab } from '../fn/crypto/keyOps';
	import {
		tasksLog,
		days,
		categories,
		tasks,
		dayViewSelectedDay,
		imported
	} from '../stores/dayViewSelectedDay';
	import domainGetter from '../fn/domainGetter';
	import encrypt from '../fn/crypto/encrypt';
	import { allowUpdates } from '../stores/ini';
	import { updateLabel } from '../stores/updateLabel';
	import symmetricEncrypt from '../fn/crypto/symmetricEncrypt';
	import MenuMain from '../components/Menu/MenuMain.svelte';
	import { activeApp } from '../stores/activeApp';
	import TessMain from '../components/Tess/TessMain.svelte';
	import { getUplinkDoc } from '../fn/uplinkdocPrep';
	import SidMain from '../components/SID/SIDMain.svelte';
	import { tessPIN } from '../stores/tessPIN';
	import { getSIDUplinkDoc } from '../fn/SIDUplinkDocPrep';
	import { SIDs, SIDsImported, availableSIDs, statusArray } from '../components/SID/SIDVault';
	import {
		currentDay,
		exfArray,
		isTessImported,
		logs,
		priorityArray,
		projects,
		statusArray as tessStatusArray
	} from '../components/Tess/TessVault';
	import { getTessUplinkDoc } from '../fn/TessUplinkDocPrep';
	import { currentActivity } from '../stores/currentActivity';
	import { startConnection } from '../fn/realtime';
	import { RTC } from '../stores/RTC';
	import isMobile from '../fn/isMobile';
	import VerticalLine from '../components/common/VerticalLine.svelte';
	import globalStyle from '../stores/globalStyles';
	import { getTransition } from '../fn/getTransisitions';
	import Button from '../components/common/Button.svelte';
	import { appColors } from '../config/appColors';
	import Box from '../components/common/Box.svelte';
	import Label from '../components/common/Label.svelte';
	import DecoX from '../components/deco/DecoX.svelte';
	import SyncingDeco from '../components/deco/SyncingDeco.svelte';
	import SidDeco from '../components/deco/SIDDeco.svelte';
	import TessDeco from '../components/deco/TessDeco.svelte';
	import { fly } from 'svelte/transition';
	import SettingsDecoV2 from '../components/deco/SettingsDeco_V2.svelte';
	import LogOutDeco from '../components/deco/LogOutDeco.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import List from '../components/common/List.svelte';
	import ListItem from '../components/common/ListItem.svelte';
	import logout from '../fn/logout';
	import StarMain from '../components/Star/StarMain.svelte';
	const activeAppToComponent = {
		arc: HomeMain,
		sid: SidMain,
		tess: TessMain,
		menu: MenuMain,
		star: StarMain
	};

	let showDecoGrid = false;

	const activeAppToLogo = {
		arc: { deco: SyncingDeco, label: 'ARC' },
		sid: { deco: SidDeco, label: 'SID Vault' },
		tess: { deco: TessDeco, label: 'TESS-AVN' }
	};

	let uplinkChecker;
	let sent = false;
	let lastStoreUpdateUnix = 0;

	onMount(() => {
		setTimeout(() => {
			showDecoGrid = true;
		}, 150);
		RTC.set(startConnection());
		uplinkChecker = setInterval(async () => {
			if (
				$tessPIN.pin !== 'none' &&
				Date.now() - lastStoreUpdateUnix > 1000 &&
				sent === false &&
				$allowUpdates === true &&
				$activeApp === 'tess' &&
				$isTessImported === true
			) {
				updateLabel.set('[Updating]');
				await sendUpdate('tess');
				sent = true;
			}

			if (
				$tessPIN.pin !== 'none' &&
				Date.now() - lastStoreUpdateUnix > 1000 &&
				sent === false &&
				$allowUpdates === true &&
				$activeApp === 'sid' &&
				$SIDsImported === true
			) {
				updateLabel.set('[Updating]');
				await sendUpdate('sid');
				sent = true;
			}
			if (
				Date.now() - lastStoreUpdateUnix > 1000 &&
				sent === false &&
				$allowUpdates === true &&
				$activeApp === 'arc'
			) {
				updateLabel.set('[Updating]');
				await sendUpdate('arc');
				sent = true;
			}
		}, 500);
	});

	async function onDataUpdate(appID) {
		if (appID === 'arc') {
			lastStoreUpdateUnix = Date.now();
			sent = false;
			if ($imported === true) {
				await getUplinkDoc($categories, $tasks, $tasksLog, $days, true);
			}
		} else if (appID === 'sid') {
			lastStoreUpdateUnix = Date.now();
			sent = false;
			if ($tessPIN.pin !== 'none' && $availableSIDs > 0) {
				await getSIDUplinkDoc($SIDs, $statusArray, $tessPIN.pin, true);
			}
		} else if (appID === 'tess') {
			lastStoreUpdateUnix = Date.now();
			sent = false;
			if ($tessPIN.pin !== 'none') {
				await getTessUplinkDoc(
					$logs,
					$currentDay,
					$exfArray,
					$tessStatusArray,
					$priorityArray,
					$projects,
					$tessPIN.pin,
					true
				);
			}
		}
	}

	priorityArray.subscribe(async (pa) => {
		await onDataUpdate('tess');
	});

	projects.subscribe(async (ps) => {
		await onDataUpdate('tess');
	});

	logs.subscribe(async () => {
		await onDataUpdate('tess');
	});

	currentDay.subscribe(async () => {
		await onDataUpdate('tess');
	});

	exfArray.subscribe(async () => {
		await onDataUpdate('tess');
	});

	tessStatusArray.subscribe(async () => {
		await onDataUpdate('tess');
	});

	SIDs.subscribe(async (sids) => {
		await onDataUpdate('sid');
	});

	statusArray.subscribe(async (sa) => {
		await onDataUpdate('sid');
	});

	categories.subscribe(async (cats) => {
		await onDataUpdate('arc');
	});

	tasks.subscribe(async (t) => {
		await onDataUpdate('arc');
	});

	days.subscribe(async (d) => {
		await onDataUpdate('arc');
	});

	tasksLog.subscribe(async (tl) => {
		await onDataUpdate('arc');
	});

	function handleEncryptionError() {
		updateLabel.set('Error');
		setTimeout(() => {
			updateLabel.set('none');
		}, 2000);
		return;
	}

	async function sendUpdate(appID) {
		try {
			let uplinkdocResults;
			if (appID === 'arc') {
				uplinkdocResults = await getUplinkDoc($categories, $tasks, $tasksLog, $days, true);
			} else if (appID === 'sid') {
				uplinkdocResults = await getSIDUplinkDoc($SIDs, $statusArray, $tessPIN.pin, true);
			} else if (appID === 'tess') {
				uplinkdocResults = await getTessUplinkDoc(
					$logs,
					$currentDay,
					$exfArray,
					$tessStatusArray,
					$priorityArray,
					$projects,
					$tessPIN.pin,
					true
				);
			}
			if (
				uplinkdocResults !== undefined &&
				uplinkdocResults.status === true &&
				uplinkdocResults.uplinkDoc !== undefined
			) {
				fetch(domainGetter('/account/update'), {
					method: 'POST',
					body: JSON.stringify(uplinkdocResults.uplinkDoc),
					credentials: 'include'
				})
					.then((res) => {
						res.json().then((responseData) => {
							if (responseData.error !== undefined) {
								if (responseData.id === 'ATX-810') {
									window.location.href = '/login';
								}
							}
							try {
								if (responseData.success) {
									updateLabel.set('none');
								}
							} catch (e) {}
						});
					})
					.catch((e) => {});
			} else if (uplinkdocResults.status === false) {
				handleEncryptionError();
			}
		} catch (e) {
			console.log(e);
		}
	}

	onDestroy(() => {
		if (uplinkChecker) {
			clearInterval(uplinkChecker);
		}
	});
</script>

{#if isMobile() === true}
	<svelte:component this={activeAppToComponent[$activeApp]} />
{/if}

{#if isMobile() === false}
	{#if showDecoGrid}
		<List direction="row" width="100%" height="100%" style="flex-wrap: wrap; overflow: hidden;">
			{#each new Array(170) as x, ix}
				<ListItem marginBottom="3%" width="5vh" height="5vh" style="min-width: 5%;">
					<DecoX
						style="transform: rotate(-45deg);"
						width="100%"
						height="100%"
						color={$globalStyle.activeColor}
						opacity={0.4}
					/>
				</ListItem>
			{/each}
		</List>
	{/if}
	<Label
		text="This app is currently mobile only"
		left="50%"
		top="50%"
		verticalCenter={true}
		horizontalCenter={true}
		backgroundColor="{$globalStyle.activeColor}20"
		width="50%"
		height="8%"
	/>
{/if}
