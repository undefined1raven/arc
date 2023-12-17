<script lang="ts">
	import { onMount } from 'svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import StarDeco from '../deco/StarDeco.svelte';
	import { activeStarApp } from './activeStarApp';
	import ListItem from '../common/ListItem.svelte';
	import List from '../common/List.svelte';
	import { datePadding } from '../../fn/datePadding';
	import timePadding from '../../fn/timePadding';
	import DateInput from '../common/DateInput.svelte';
	import { starAccess } from './starPassword';
	import { starSelectedArchive } from './starSelectedArchive';
	import { fly } from 'svelte/transition';

	let fileInput;
	let thread = { messages: [] };

	function getDisplayTime(unix) {
		const date = new Date(unix);
		return `${timePadding(date.getHours())}:${timePadding(date.getMinutes())}:${timePadding(
			date.getSeconds()
		)}`;
	}

	function getDisplayDate(unix) {
		const date = new Date(unix);
		return `${datePadding(parseFloat(date.getDate()) + 1)}-${datePadding(
			date.getMonth()
		)}-${date.getFullYear()}`;
	}
	let showPicker = true;

	function loadNextChunk(chunkLen) {
		let lowerBound = 0;
		if (thread.messages.length > 0) {
			lowerBound = thread.messages[thread.messages.length - 1].timestamp_ms + 1;
		}
		const idbKeyRange = IDBKeyRange.lowerBound(lowerBound);
		if (localStorage.getItem('starArchiveVersion') !== null) {
			const idbReq = indexedDB.open(
				'messageArchives',
				parseInt(localStorage.getItem('starArchiveVersion'))
			);
			let cix = 0;
			idbReq.onsuccess = (ev) => {
				const db = ev.target.result;
				const trans = db.transaction([$starSelectedArchive], 'readonly');
				const os = trans.objectStore($starSelectedArchive);
				os.openCursor(idbKeyRange).onsuccess = (e) => {
					const cursor = e.target.result;
					thread.messages = [...thread.messages, cursor.value];
					if (cix < chunkLen - 1) {
						cursor.continue();
						cix++;
					} else {
						console.log('chunk loaded');
					}
				};
			};
			idbReq.onerror = (ev) => {
				console.log('smth');
			};
		}
	}

	let list;
	let lastChunkLoad = 0;
	let lea = false;
	$: if (typeof list === 'object') {
		if (lea === false) {
			lea = true;
			list.addEventListener('scroll', (e) => {
				if (
					Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) <
						0.03 * list.clientHeight &&
					Date.now() - lastChunkLoad > 250
				) {
					loadNextChunk(25);
					lastChunkLoad = Date.now();
				}
			});
		}
	}

	onMount(() => {
		if ($starAccess === false) {
			window.location.hash = '#login';
		}
		loadNextChunk(50);
	});
</script>

<Box figmaImport={{ mobile: { top: 86, left: 2, width: 356, height: 552 } }}>
	<List
		on:thisDOM={(e) => {
			list = e.detail;
		}}
		direction="column"
		width="100%"
		height="100%"
	>
		{#each thread.messages
			.toSorted((a, b) => {
				return a.timestamp_ms - b.timestamp_ms;
			})
			.toSorted((a) => a.content !== '') as message, ix}
			{#if message.sender_name === $starSelectedArchive.split('__AIX_SourceID:Instagram')[0]}
				<ListItem
					transitions={{ in: { func: fly, options: { x: '-30%', duration: 200 } } }}
					left="2%"
					height="auto"
					marginTop="5%"
					marginBottom="5%"
					width="100%"
					style="display: flex; justify-content: start; padding: 0%;"
				>
					<Label
						style="text-align: start; padding: 2%; max-width: 80%; min-width: 20%; position: relative;"
						height="auto"
						left="-2%"
						verticalFont={$globalStyle.mediumMobileFont}
						borderColor={$globalStyle.activeMono}
						text={message.content}
					/>
					<Label
						left="-3%"
						style="padding: 1%;"
						top="100%"
						verticalFont={$globalStyle.smallMobileFont}
						text={`${getDisplayDate(message.timestamp_ms)} | ${getDisplayTime(
							message.timestamp_ms
						)}`}
					/>
				</ListItem>
			{/if}
			{#if message.sender_name !== $starSelectedArchive.split('__AIX_SourceID:Instagram')[0]}
				<ListItem
					transitions={{ in: { func: fly, options: { x: '30%', duration: 200 } } }}
					height="auto"
					marginBottom="5%"
					marginTop="5%"
					width="100%"
					style="right: 1%; display: flex; justify-content: end; padding: 0.5%;"
				>
					<Label
						style="right: 0%; text-align: end; padding: 2%; max-width: 80%; min-width: 20%; position: relative;"
						borderColor={$globalStyle.activeMono}
						height="auto"
						verticalFont={$globalStyle.mediumMobileFont}
						text={message.content}
					/>
					<Label
						style="padding: 1%; right: -1%;"
						top="100%"
						verticalFont={$globalStyle.smallMobileFont}
						text={`${getDisplayDate(message.timestamp_ms)} | ${getDisplayTime(
							message.timestamp_ms
						)}`}
					/>
				</ListItem>
			{/if}
		{/each}
	</List></Box
>
