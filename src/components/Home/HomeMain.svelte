<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import {
		ab2str,
		exportCryptoKey,
		importPrivateKey,
		importSymmetricKey,
		str2ab
	} from '../../fn/crypto/keyOps';
	import decrypt from '../../fn/crypto/decrypt';
	import { fade, fly } from 'svelte/transition';
	import windowHash from '../../stores/windowHash';
	import HomeActual from './HomeActual.svelte';
	import DayViewMain from '../DayView/DayViewMain.svelte';
	import LogsMain from '../Logs/LogsMain.svelte';
	import EditMain from '../Edit/EditMain.svelte';
	import {
		categories,
		dayViewSelectedDay,
		days,
		imported,
		tasks,
		tasksLog
	} from '../../stores/dayViewSelectedDay';
	import { currentActivity } from '../../stores/currentActivity';
	import SettingsMain from '../Settings/SettingsMain.svelte';
	import { keyHash } from '../../stores/keyHash';
	import domainGetter from '../../fn/domainGetter';
	import { allowUpdates } from '../../stores/ini';
	import { updateLabel } from '../../stores/updateLabel';
	import SyncingDeco from '../deco/SyncingDeco.svelte';
	import symmetricDecrypt from '../../fn/crypto/symmetricDecrypt';
	import StatsMain from '../Stats/StatsMain.svelte';
	import { isOnline } from '../../stores/online';
	import NetworkIndicator from './NetworkIndicator.svelte';
	import { touchEnd, touchStart, touchMove } from '../../stores/touchGestures';
	import { keysStatus } from '../../stores/keysStatus';
	import { activeApp } from '../../stores/activeApp';
	import ColorBox from '../common/ColorBox.svelte';
	import DataExplorerMain from '../DataExplorer/DataExplorerMain.svelte';

	let isColorBoxBeingShown = false;
	let rendered = false;
	let leo = '';
	const validPaths = [
		'#home',
		'#dayView',
		'#logs',
		'#edit',
		'#settings',
		'#stats',
		'#EX7currentDay',
		'#dataExplorer'
	];

	const hashToComponent = {
		'#home': HomeActual,
		'#dayView': DayViewMain,
		'#logs': LogsMain,
		'#edit': EditMain,
		'#settings': SettingsMain,
		'#stats': StatsMain,
		'#dataExplorer': DataExplorerMain
	};

	async function processEncrypted(encryptedObj, key, allowUpdatesValue) {
		leo = JSON.stringify(encryptedObj);
		const encrypted = encryptedObj;
		await symmetricDecrypt(encrypted.categories.cipher, key, encrypted.categories.iv).then(
			(decrypted) => {
				JSON.parse(decrypted);
				try {
					const decryptedCategories = JSON.parse(decrypted);
					categories.set(decryptedCategories);
				} catch (e) {
					console.log(e);
				}
			}
		);
		await symmetricDecrypt(encrypted.tasks.cipher, key, encrypted.tasks.iv).then((decrypted) => {
			try {
				const decryptedTasks = JSON.parse(decrypted);
				tasks.set(decryptedTasks);
			} catch (e) {
				console.log(e);
			}
		});
		await symmetricDecrypt(encrypted.tasksLog.cipher, key, encrypted.tasksLog.iv).then(
			(decrypted) => {
				try {
					let decryptedTasksLog = JSON.parse(decrypted);
					if ($tasksLog.length > decryptedTasksLog.length) {
						for (let ix = $tasksLog.length - decryptedTasksLog.length; ix > 0; ix--) {
							decryptedTasksLog.push($tasksLog[$tasksLog.length - ix]);
						}
					}
					tasksLog.set(decryptedTasksLog);
				} catch (e) {
					console.log(e);
				}
			}
		);
		await symmetricDecrypt(encrypted.days.cipher, key, encrypted.days.iv).then((decrypted) => {
			try {
				const decryptedDays = JSON.parse(decrypted);
				days.set(decryptedDays);
			} catch (e) {
				console.log(e);
			}
		});

		setInterval(() => {
			if (Date.now() - $days[$days.length - 1].dayEndUnix >= 86400000) {
				let lowerBoundUnix =
					new Date($days[$days.length - 1].dayEndUnix).setHours(23, 59, 59, 59) + 1000;
				let upperBoundUnix = lowerBoundUnix + 86400000;

				const prevDaysTasks = [];
				for (let ix = $tasksLog.length - 1; ix >= 0; ix--) {
					const task = $tasksLog[ix];
					if (task.taskStartUnix > lowerBoundUnix && task.taskStartUnix < upperBoundUnix) {
						prevDaysTasks.push(task);
					} else {
						break;
					}
				}

				let dayObj = {};
				//get day coverage
				let trackedTime = 0;
				for (let ix = 0; ix < prevDaysTasks.length; ix++) {
					const task = prevDaysTasks[ix];
					trackedTime += task.taskEndUnix - task.taskStartUnix;
				}
				let dayCoverage = ((trackedTime / 86400000) * 100).toFixed(0) + '%';

				dayObj['coverage'] = dayCoverage;
				dayObj['dayStartUnix'] = lowerBoundUnix;
				dayObj['dayEndUnix'] = upperBoundUnix - 100;

				//get day state [just routine based so far]
				const routineTasks = $tasks.filter((task) => task.isRoutine);
				if (routineTasks.length === 0) {
					dayObj['routine'] = true;
					dayObj['status'] = 'success';
				} else {
					let routineTasksCompleted = 0;
					for (let ix = 0; ix < routineTasks.length; ix++) {
						const task = routineTasks[ix];
						const taskLog = prevDaysTasks.filter((prevTask) => prevTask.taskID === task.id)[0];
						if (taskLog && task) {
							let scheduledStartUnix = new Date(lowerBoundUnix).setHours(
								task.expectedStart[0],
								task.expectedStart[1],
								task.expectedStart[3],
								task.expectedStart[4]
							);
							let scheduledEndUnix = new Date(lowerBoundUnix).setHours(
								task.expectedEnd[0],
								task.expectedEnd[1],
								task.expectedEnd[3],
								task.expectedEnd[4]
							);
							let startedOnTime = false;
							let endedOnTime = false;
							let acceptableOffset = 1000 * 60 * 20;
							if (Math.abs(scheduledStartUnix - taskLog.taskStartUnix) < acceptableOffset) {
								startedOnTime = true;
							}
							if (Math.abs(scheduledEndUnix - taskLog.taskEndUnix) < acceptableOffset) {
								endedOnTime = true;
							}
							if (startedOnTime && endedOnTime) {
								routineTasksCompleted++;
							}
						}
					}
					if (routineTasksCompleted === routineTasks.length) {
						dayObj['routine'] = true;
						dayObj['status'] = 'success';
					} else {
						dayObj['routine'] = false;
						dayObj['status'] = 'fail';
					}
				}
				if ($days.findIndex((elm) => elm.dayStartUnix === lowerBoundUnix) === -1) {
					days.update((days) => {
						days.push(dayObj);
						return days;
					});
				}
			}
		}, 30000);

		imported.set(true);
		allowUpdates.set(allowUpdatesValue);
		updateLabel.set('none');
	}

	onMount(() => {
		if (localStorage.getItem('privateKey') === null || localStorage.getItem('simkey') === null) {
			window.location.href = '/login';
		} else {
			window.location.hash = 'home';
			rendered = true;
			importSymmetricKey(JSON.parse(localStorage.getItem('simkey')))
				.then((key) => {
					keysStatus.set(1);
					const cache = JSON.parse(localStorage.getItem('encryptedOfflineCache'));
					if (cache !== null) {
						processEncrypted(cache, key, false);
					}
					fetch(domainGetter('/account/latest'), {
						method: 'GET',
						credentials: 'include'
					})
						.then((res) => {
							res
								.json()
								.then(async (responseData) => {
									isOnline.set(1);
									if (responseData.id === 'ATX-810') {
										window.location.href = '/login';
									}
									if (responseData.error === undefined) {
										////////////DO NOT FORGET TO UNDO
										if (responseData.encrypted === null) {
											window.location.href = '/login';
										}
										try {
											if (responseData.encrypted.tx < cache.tx) {
												processEncrypted(cache, key, true);
											} else {
												localStorage.setItem(
													'encryptedOfflineCache',
													JSON.stringify(responseData.encrypted)
												);
												processEncrypted(responseData.encrypted, key, true);
											}
										} catch (e) {
											console.log(e);
											localStorage.setItem(
												'encryptedOfflineCache',
												JSON.stringify(responseData.encrypted)
											);
											processEncrypted(responseData.encrypted, key, true);
										}
									}
								})
								.catch((e) => {
									console.log(e);
									isOnline.set(-2);
								});
						})
						.catch((e) => {
							isOnline.set(0);
							importSymmetricKey(JSON.parse(localStorage.getItem('simkey'))).then((key) => {
								keysStatus.set(1);
								if (localStorage.getItem('accountID') === null) {
									window.location.href = '/login';
								}
								processEncrypted(
									JSON.parse(localStorage.getItem('encryptedOfflineCache')),
									key,
									true
								);
							});
						});
				})
				.catch((err) => {
					keysStatus.set(0);
					console.log(err);
				});

			let cachedCurrentActivity = localStorage.getItem('currentActivity');

			if (cachedCurrentActivity !== null) {
				currentActivity.set(JSON.parse(cachedCurrentActivity));
			}
		}
	});

	windowHash.subscribe((wh) => {
		if (wh === '#dayView' && Object.keys($dayViewSelectedDay).length === 0) {
			// window.location.hash = 'home';
		}
		if (validPaths.indexOf(wh) === -1 && $activeApp === 'arc') {
			window.location.hash = 'home';
		}
	});
</script>

<root>
	{#if rendered}
		<svelte:component this={hashToComponent[$windowHash]} />
	{/if}
</root>
