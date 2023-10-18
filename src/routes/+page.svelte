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

	const activeAppToComponent = { arc: HomeMain, sid: Label, tess: Label, menu: MenuMain };

	let uplinkChecker;
	let sent = false;
	let lastStoreUpdateUnix = 0;

	onMount(() => {
		uplinkChecker = setInterval(() => {
			if (Date.now() - lastStoreUpdateUnix > 2000 && sent === false && $allowUpdates === true) {
				updateLabel.set('[Updating]');
				sendUpdate();
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

	function sendUpdate() {
		let accountID = localStorage.getItem('accountID');
		if (accountID === null) {
			window.location.href = '/login';
		} else {
			importSymmetricKey(JSON.parse(localStorage.getItem('simkey')))
				.then(async (simkey) => {
					let uplinkDoc = {};
					await symmetricEncrypt(JSON.stringify($categories), simkey)
						.then((result) => {
							uplinkDoc['categories'] = { cipher: result.cipher, iv: result.iv };
						})
						.catch((e) => {
							handleEncryptionError();
						});
					await symmetricEncrypt(JSON.stringify($tasks), simkey)
						.then((result) => {
							uplinkDoc['tasks'] = { cipher: result.cipher, iv: result.iv };
						})
						.catch((e) => {
							handleEncryptionError();
						});
					await symmetricEncrypt(JSON.stringify($days), simkey)
						.then((result) => {
							uplinkDoc['days'] = { cipher: result.cipher, iv: result.iv };
						})
						.catch((e) => {
							handleEncryptionError();
						});
					await symmetricEncrypt(JSON.stringify($tasksLog), simkey)
						.then((result) => {
							uplinkDoc['tasksLog'] = { cipher: result.cipher, iv: result.iv };
						})
						.catch((e) => {
							handleEncryptionError();
						});
					uplinkDoc['accountID'] = accountID;

					if (localStorage.getItem('at') === null) {
						window.location.href = '/login';
					}
					uplinkDoc['at'] = localStorage.getItem('at');

					fetch(domainGetter('/account/update'), {
						method: 'POST',
						body: JSON.stringify(uplinkDoc),
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
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}

	onDestroy(() => {
		if (uplinkChecker) {
			clearInterval(uplinkChecker);
		}
	});
</script>

<svelte:component this={activeAppToComponent[$activeApp]} />
