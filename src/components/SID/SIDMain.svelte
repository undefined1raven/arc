<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import RingDeco from '../deco/RingDeco.svelte';
	import SidMainActual from './SIDMainActual.svelte';
	import SidView from './SIDView.svelte';
	import Notes from './Notes.svelte';
	import NoteView from './NoteView.svelte';
	import { SIDs, SIDsImported, availableSIDs, statusArray } from './SIDVault';
	import { str2ab, unwrapKey } from '../../fn/crypto/keyOps';
	import { processEncryptedSID } from './fn/processEncryptedSID';

	const hashToComponent = {
		'#login': Login,
		'#home': SidMainActual,
		'#SIDView': SidView,
		'#notes': Notes,
		'#noteView': NoteView
	};

	onMount(() => {
		if ($SIDsImported === false) {
			try {
				const tess_simkey = JSON.parse(localStorage.getItem('tess_simkey'));
				unwrapKey(
					str2ab(tess_simkey.key),
					$tessPIN.pin,
					str2ab(tess_simkey.salt),
					str2ab(tess_simkey.iv)
				)
					.then(async (key) => {
						const currentCache = JSON.parse(localStorage.getItem('encryptedOfflineCache'));
						if (currentCache.SIDs !== undefined && currentCache.statusArray !== undefined) {
							const encryptedSIDs = currentCache.SIDs;
							const encryptedStatusArray = currentCache.statusArray;
							const decryptedObj = await processEncryptedSID(
								encryptedSIDs,
								encryptedStatusArray,
								key
							);
							SIDs.set(decryptedObj.SIDs);
							statusArray.set(decryptedObj.statusArray);
							availableSIDs.set(decryptedObj.SIDs?.length);
							SIDsImported.set(true);
						} else {
							SIDsImported.set(true);
						}
					})
					.catch((e) => {
						console.log(e);
					});
			} catch (e) {
				console.log(e);
			}
		}
	});

	tessPIN.subscribe((tp) => {
		if (tp.ini === false || Math.abs(Date.now() - tp.tx) > 20 * 60 * 1000) {
			window.location.hash = 'login';
		} else {
			window.location.hash = 'home';
		}
	});
</script>

<svelte:component this={hashToComponent[$windowHash]} />
