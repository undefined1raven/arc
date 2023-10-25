<script lang="ts">
	import Box from '../components/common/Box.svelte';
	import Label from '../components/common/Label.svelte';
	import Button from '../components/common/Button.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import globalStyle from '../stores/globalStyles';
	import HomeMain from '../components/Home/HomeMain.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { ab2str, importPublicKey, importSymmetricKey } from '../fn/crypto/keyOps';
	import {
		tasksLog,
		days,
		categories,
		tasks,
		dayViewSelectedDay
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

	const activeAppToComponent = { arc: HomeMain, sid: Label, tess: TessMain, menu: MenuMain };

	let uplinkChecker;
	let sent = false;
	let lastStoreUpdateUnix = 0;

	onMount(() => {
		uplinkChecker = setInterval(async () => {
			if (Date.now() - lastStoreUpdateUnix > 2000 && sent === false && $allowUpdates === true) {
				updateLabel.set('[Updating]');
				await sendUpdate();
				sent = true;
			}
		}, 500);
	});

	categories.subscribe((cats) => {
		lastStoreUpdateUnix = Date.now();
		sent = false;
	});

	tasks.subscribe((t) => {
		lastStoreUpdateUnix = Date.now();
		sent = false;
	});

	days.subscribe((d) => {
		lastStoreUpdateUnix = Date.now();
		sent = false;
	});

	tasksLog.subscribe((tl) => {
		lastStoreUpdateUnix = Date.now();
		sent = false;
	});

	function handleEncryptionError() {
		updateLabel.set('Error');
		setTimeout(() => {
			updateLabel.set('none');
		}, 2000);
		return;
	}

	async function sendUpdate() {
		let uplinkdocResults = await getUplinkDoc($categories, $tasks, $tasksLog, $days, true);
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
	}

	onDestroy(() => {
		if (uplinkChecker) {
			clearInterval(uplinkChecker);
		}
	});
</script>

<svelte:component this={activeAppToComponent[$activeApp]} />
