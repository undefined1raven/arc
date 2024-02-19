<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import globalStyle from '../../stores/globalStyles';
	import { tasks, tasksLog } from '../../stores/dayViewSelectedDay';
	import timePadding from '../../fn/timePadding';
	import { currentActivity as currentActivityStore } from '../../stores/currentActivity';
	import { onDestroy, onMount } from 'svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let currentActivity = { taskID: undefined, taskStartUnix: undefined }; //taskID, taskStartUnix

	let trackedTimeLabel = '';
	let ix = 0;
	let show = true;

	function setTrackedTimeLabel(taskStartUnix) {
		if (currentActivity !== null) {
			if (taskStartUnix > 0) {
				let timeDelta = Date.now() - taskStartUnix;
				return (
					timePadding(Math.floor(timeDelta / 1000 / 60 / 60)) +
					':' +
					timePadding(Math.floor(timeDelta / 1000 / 60) % 60) +
					':' +
					timePadding((Math.floor(timeDelta / 1000) % 60) % 60)
				);
			} else {
				return '';
			}
		}
	}

	let interval;
	onMount(() => {
		interval = setInterval(() => {
			trackedTimeLabel = setTrackedTimeLabel(currentActivity.taskStartUnix);
		}, 500);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});

	export { currentActivity, ix, show };
</script>

{#if show === true}
	<Label
		verticalFont={$globalStyle.largeMobileFont}
		text={trackedTimeLabel}
		color={$globalStyle.activeMono}
		width="100%"
		left="0%"
		top="10%"
		transitions={getTransition(1)}
	/>
	<Label
		transitions={getTransition(2)}
		verticalFont="22px"
		text={$tasks.find((task) => task.id === currentActivity.taskID)?.name}
		color={$globalStyle.activeMono}
		width="100%"
		left="0%"
		top="40%"
	/>
	<Button
		onClick={() => {
			// if ($RTC.publish) {
			// 	$RTC.publish(
			// 		localStorage.getItem('accountID'),
			// 		JSON.stringify({
			// 			currentActivityUpdate: 'null'
			// 		})
			// 	);
			// }
			tasksLog.update((old) => {
				return [
					...old,
					{
						taskID: currentActivity.taskID,
						taskStartUnix: currentActivity.taskStartUnix,
						taskEndUnix: Date.now()
					}
				];
			});
			if ($currentActivityStore.length === 1) {
				localStorage.setItem('currentActivity', 'null');
				currentActivityStore.set(null);
			} else {
				currentActivityStore.update((prev) => {
					prev.splice(ix, 1);
					return prev;
				});
			}
			dispatch('onTaskEnd');
		}}
		onSelect={() => {
			// isColorBoxBeingShown = true;
		}}
		width="90%"
		height="22%"
		label="Done"
		desktopFont={$globalStyle.mediumDesktopFont}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		left="5%"
		top="70%"
	/>
{/if}
