<script lang="ts">
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import StarHeader from './StarHeader.svelte';
	import StarLogin from './StarLogin.svelte';
	import StarMenu from './StarMenu.svelte';
	import StarMessageArchive from './StarMessageArchive.svelte';
	import { activeStarApp } from './activeStarApp';
	import { starAccess, starPassword } from './starPassword';
	import bcrypt from 'bcryptjs';
	import StarArchiveSelector from './StarArchiveSelector.svelte';
	import StarAddSourceFileFlow from './StarAddSourceFileFlow.svelte';
	const hashToComponent = {
		'#login': StarLogin,
		'#home': StarMenu,
		'#archive': StarMessageArchive,
		'#archiveSelector': StarArchiveSelector,
		'#archiveSetup.selectSourceType': StarAddSourceFileFlow,
		'#archiveSetup.pickFile': StarAddSourceFileFlow,
		'#archiveSetup.linkSID': StarAddSourceFileFlow,
		'#archiveSetup.finishUp': StarAddSourceFileFlow
	};

	onMount(() => {
		const starHash = localStorage.getItem('starHash');
		// setInterval(() => {
		// 	bcrypt
		// 		.compare($starPassword, starHash)
		// 		.then((res) => {
		// 			if (res === false) {
		// 				starAccess.set(false);
		// 				window.location.hash = '#login';
		// 			}
		// 		})
		// 		.catch((e) => {
		// 			starAccess.set(false);
		// 			window.location.hash = '#login';
		// 		});
		// }, 30000);
		if (starHash === null) {
			localStorage.setItem('starHash', 'none');
			window.location.hash = '#login';
		} else if ($starAccess === false) {
			window.location.hash = '#login';
		}
	});
</script>

<StarHeader />
<svelte:component this={hashToComponent[$windowHash]} />
