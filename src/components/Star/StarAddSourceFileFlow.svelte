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
	import AddDeco from '../deco/AddDeco.svelte';
	import { starSelectedArchive, starSelectedArchiveDisplayName } from './starSelectedArchive';
	import windowHash from '../../stores/windowHash';
	import InstaLogo from '../deco/InstaLogo.svelte';
	import { fly } from 'svelte/transition';
	import Input from '../common/Input.svelte';
	import FileDeco from '../deco/FileDeco.svelte';

	let fileInput;

	///config
	let fileSourceObj = {};
	let thread = { messages: [] };
	let SIDRef = '';
	let archives =
		localStorage.getItem('starArchiveNameMap') !== null
			? JSON.parse(localStorage.getItem('starArchiveNameMap'))
			: [];

	$: stage = $windowHash.split('.')[1]; /// selectSourceType | pickFile | linkSID | finishUp
	const stageToLabel = {
		selectSourceType: 'Select Source Type',
		pickFile: 'Pick File',
		linkSID: 'Link SID',
		finishUp: 'Finish Up'
	};

	$: if (
		fileInput !== undefined &&
		fileInput !== null &&
		fileInput.addEventListener !== undefined
	) {
		const reader = new FileReader();
		fileInput.addEventListener('change', (e) => {
			const fileList = e.target.files;
			reader.readAsText(fileList[0]);
			reader.addEventListener('load', (ex) => {
				try {
					let raw = JSON.parse(reader.result);
					thread = raw;
					window.location.hash = '#archiveSetup.linkSID';
				} catch (e) {}
			});
		});
	}

	onMount(() => {
		if ($starAccess === false) {
			window.location.hash = '#login';
		}
	});

	const fileSources = [{ name: 'Instagram', deco: InstaLogo, sufix: '__AIX_SourceID:Instagram' }];

	function archiveFile() {
		const archiveID = thread.title + fileSourceObj.sufix;
		const newStarArchiveNameMap = [
			{
				displayName: SIDRef,
				archiveID: archiveID,
				fileSourceName: fileSourceObj.name
			}
		];
		let alreadyHasSID = false;
		if (localStorage.getItem('starArchiveNameMap') === null) {
			localStorage.setItem('starArchiveNameMap', JSON.stringify(newStarArchiveNameMap));
		} else {
			try {
				let currentStarArchiveNameMap = JSON.parse(localStorage.getItem('starArchiveNameMap'));
				if (currentStarArchiveNameMap.findIndex((elm) => elm.displayName === SIDRef) === -1) {
					currentStarArchiveNameMap.push(newStarArchiveNameMap[0]);
					localStorage.setItem('starArchiveNameMap', JSON.stringify(currentStarArchiveNameMap));
					alreadyHasSID = false;
				} else {
					alreadyHasSID = true;
				}
			} catch (e) {}
		}
		if (alreadyHasSID === false) {
			const idbVersion = Date.now();
			localStorage.setItem('starArchiveVersion', idbVersion);
			const idbReq = indexedDB.open('messageArchives', idbVersion);
			idbReq.onsuccess = (ev) => {};
			idbReq.onupgradeneeded = (ev) => {
				const db = ev.target.result;
				const ost = db.createObjectStore(archiveID, {
					keyPath: 'timestamp_ms'
				});
				ost.createIndex('tx', 'timestamp_ms', { unique: true });
				ost.transaction.oncomplete = (ev) => {
					const oct = db.transaction(archiveID, 'readwrite').objectStore(archiveID);
					thread.messages.forEach((m) => {
						oct.add(m);
					});
				};
				window.location.hash = '#archiveSelector';
			};
			idbReq.onerror = (ev) => {
				console.log(ev);
			};
		} else {
			const currentDBVersion = parseInt(localStorage.getItem('starArchiveVersion'));
			const idbReq = indexedDB.open('messageArchives', currentDBVersion);
			idbReq.onsuccess = (e) => {
				const db = e.target.result;
				for (let ix = 0; ix < thread.messages.length; ix++) {
					const transaction = db.transaction([archiveID], 'readwrite');
					transaction.oncomplete = (e) => {};
					transaction.onerror = (e) => {};
					const osm = transaction.objectStore(archiveID);
					const makeAddReq = osm.add(thread.messages[ix]);
					makeAddReq.onsuccess = (e) => {};
				}
				window.location.hash = '#archiveSelector';
			};
			idbReq.onerror = (e) => {
				console.log(e);
			};
		}
	}
</script>

<Label
	figmaImport={{ mobile: { top: 84, left: 10 } }}
	text="Add source file \ {stageToLabel[stage]}"
	verticalFont={$globalStyle.mediumMobileFont}
	transitions={getTransition(1)}
/>

{#if stage === 'selectSourceType'}
	<List
		horizontalCenter={true}
		direction="column"
		figmaImport={{ mobile: { top: 175, left: '50%', width: 298, height: 50 } }}
	>
		{#each fileSources as source, ix}
			<ListItem
				transitions={getTransition(ix + 2)}
				height="100%"
				width="20%"
				style="margin-left: 4%; margin-right: 4%;"
				><Button
					borderColor={$globalStyle.activeMono}
					width="100%"
					height="100%"
					hoverOpacityMin={0}
					hoverOpacityMax={20}
					onClick={() => {
						fileSourceObj = source;
						window.location.hash = '#archiveSetup.pickFile';
					}}
					><svelte:component
						this={source.deco}
						width="60%"
						height="60%"
						color={$globalStyle.activeMono}
					/></Button
				></ListItem
			>
		{/each}
	</List>
{/if}
{#if stage === 'pickFile'}
	<Box
		figmaImport={{ desktop: { top: 163, left: '50%', width: 282, height: 52 } }}
		horizontalCenter={true}
		style="z-index: 1500000;"
		transitions={getTransition(2)}
	>
		<Button
			style="overflow: hidden;"
			borderColor={$globalStyle.activeMono}
			width="100%"
			height="100%"
			label="Pick File"
			hoverOpacityMin={0}
			hoverOpacityMax={10}
			borderRadius="5px"
		/>
		<input
			bind:this={fileInput}
			style="opacity: 0.005; width: 100%; height: 100%; z-index: 55;"
			class="keyInput"
			type="file"
		/>
	</Box>
{/if}
{#if stage === 'linkSID'}
	<Label
		transitions={getTransition(1)}
		figmaImport={{ mobile: { top: 127, left: 10 } }}
		text={archives.find((elm) => elm.displayName === SIDRef) === undefined ? 'Add New SID' : 'Linked SID'}
		verticalFont={$globalStyle.mediumMobileFont}
	/>
	<Button
		onClick={() => {
			if (SIDRef.length > 0 && SIDRef.length < 50) {
				window.location.hash = '#archiveSetup.finishUp';
			}
		}}
		transitions={getTransition(2)}
		label="Next"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		borderColor={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 152, left: 256, width: 94, height: 44 } }}
	/>
	<Box
		transitions={getTransition(1.5)}
		figmaImport={{ mobile: { top: 152, left: 10, width: 238, height: 44 } }}
	>
		<Input borderColor={$globalStyle.activeMono} width="100%" height="100%" bind:value={SIDRef} />
	</Box>

	<Label
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 230, left: 10 } }}
		text="Link to existing SID"
		verticalFont={$globalStyle.mediumMobileFont}
	/>
	<Box figmaImport={{ mobile: { top: 253, left: 10, width: 340, height: 311 } }}>
		<List direction="column" width="100%" height="100%">
			{#each archives as archive, ix}
				<ListItem transitions={getTransition(ix + 1)} width="100%" height="15%" marginBottom="4%">
					<Box width="100%" height="100%">
						<Label
							text={archive.displayName}
							left="2%"
							verticalFont={$globalStyle.mediumMobileFont}
						/>
						<Button
							onClick={() => {
								SIDRef = archive.displayName;
							}}
							width="100%"
							height="100%"
							hoverOpacityMin={SIDRef === archive.displayName ? 20 : 0}
							hoverOpacityMax={20}
							borderColor={$globalStyle.activeMono}
						/></Box
					>
				</ListItem>
			{/each}
		</List></Box
	>
{/if}
{#if stage === 'finishUp'}
	<Label
		transitions={getTransition(1)}
		figmaImport={{ mobile: { top: 141, left: 73 } }}
		text="Source Type"
		verticalFont={$globalStyle.smallMobileFont}
	/>
	<Box
		backgroundColor="{$globalStyle.activeColor}10"
		transitions={getTransition(2)}
		figmaImport={{ mobile: { top: 155, left: 73, width: 25, height: 25 } }}
	>
		<svelte:component
			this={fileSourceObj.deco}
			color={$globalStyle.activeMono}
			width="60%"
			height="60%"
		/>
	</Box>
	<Label
		transitions={getTransition(2)}
		figmaImport={{ mobile: { top: 160, left: 104 } }}
		text={fileSourceObj.name}
		verticalFont={$globalStyle.mediumMobileFont}
	/>

	<Label
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 195, left: 73 } }}
		text="Imported File"
		verticalFont={$globalStyle.smallMobileFont}
	/>
	<Box
		backgroundColor="{$globalStyle.activeColor}10"
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 209, left: 73, width: 25, height: 25 } }}
	>
		<FileDeco width="60%" height="60%" color={$globalStyle.activeMono} />
	</Box>
	<Label
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 209, left: 104 } }}
		text={thread.title}
		verticalFont={$globalStyle.mediumMobileFont}
	/>
	<Label
		transitions={getTransition(4)}
		figmaImport={{ mobile: { top: 225, left: 104 } }}
		text="{thread.messages.length} messages"
		verticalFont={$globalStyle.smallMobileFont}
	/>

	<Label
		transitions={getTransition(5)}
		figmaImport={{ mobile: { top: 250, left: 73 } }}
		text="Linked SID"
		verticalFont={$globalStyle.smallMobileFont}
	/>
	<Box
		backgroundColor="{$globalStyle.activeColor}10"
		transitions={getTransition(6)}
		figmaImport={{ mobile: { top: 264, left: 73, width: 25, height: 25 } }}
	>
		<Label text="#" verticalFont={$globalStyle.largeMobileFont} />
	</Box>
	<Label
		transitions={getTransition(6)}
		figmaImport={{ mobile: { top: 269, left: 104 } }}
		text={SIDRef}
		verticalFont={$globalStyle.mediumMobileFont}
	/>

	<Button
		onClick={archiveFile}
		transitions={getTransition(7)}
		label="Confirm"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		borderColor={$globalStyle.activeMono}
		figmaImport={{ mobile: { top: 318, left: 73, width: 214, height: 41 } }}
	/>
{/if}
<Button
	transitions={{ in: { func: fly, props: { y: '-25%', duration: 50 } } }}
	label="Cancel"
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	color={$globalStyle.secondaryMono}
	borderColor={$globalStyle.secondaryMono}
	onClick={() => {
		window.location.hash = '#archiveSelector';
	}}
	figmaImport={{
		mobile: {
			top: stage === 'pickFile' || stage === 'selectSourceType' ? 343 : 576,
			left: 10,
			width: 340,
			height: 49
		}
	}}
/>
