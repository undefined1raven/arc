<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import RingDeco from '../deco/RingDeco.svelte';
	import TessHome from './TessHome.svelte';
	import Ex7logs from './ex7logs.svelte';
	import Ex7CurrentDay from './EX7CurrentDay.svelte';
	import ExfEditor from './EXFEditor.svelte';
	import { currentDay, exfArray, isTessImported, logs, moodsArray, statusArray } from './TessVault';
	import { str2ab, unwrapKey } from '../../fn/crypto/keyOps';
	import { validateInput } from '../../fn/validateInput';
	import { processEncryptedTess } from './fn/processEncryptedTess';
	import Ex7DayView from './EX7DayView.svelte';

	const hashToComponent = {
		'#login': Login,
		'#home': TessHome,
		'#EX7Logs': Ex7logs,
		'#EX7currentDay': Ex7CurrentDay,
		'#EXFEditor': ExfEditor,
		'#dayView': Ex7DayView
	};

	onMount(() => {
		if ($isTessImported === false) {
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
						if (
							validateInput(
								['logs', 'currentDay', 'exfArray', 'statusArray'],
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
								currentCache.tess.moodArray,
								key
							);
							if (decryptedObj.status === true && decryptedObj.results !== undefined) {
								logs.set(decryptedObj.results.logs);
								currentDay.set(decryptedObj.results.currentDay);
								exfArray.set(decryptedObj.results.exfArray);
								statusArray.set(decryptedObj.results.statusArray);
								moodsArray.set(decryptedObj.results.moodArray);
								isTessImported.set(true);
							}
						} else {
							isTessImported.set(true);
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
