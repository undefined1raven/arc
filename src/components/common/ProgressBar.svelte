<script>
	import { onMount } from 'svelte';
	import { RangeScaler } from '../../fn/RangeScaler';

	export let progress;
	let computedProgress = 0;
	let min = 0;
	let max = 0;
	let current = 0;
	let width = '20%';
	let height = '20%';
	let top = 'auto';
	let left = 'auto';
	let isInteractive = false;
	let isMouseDown = false;
	let primaryColor = '#FFFFFF80';
	let secondaryColor = '#99999920';
	let style = '';
	let containerID = '';

	let progressBarHeight =
		document.documentElement.clientHeight * (height.substring(0, height.length - 2) / 100);

	$: dynamicHeight(isInteractive);

	function dynamicHeight() {
		let containerHeight = document.getElementById(containerID)?.getBoundingClientRect().height;
		if (isInteractive) {
			progressBarHeight = containerHeight + 0.5 * containerHeight;
		} else {
			progressBarHeight = containerHeight;
		}
	}

	onMount(() => {
		if (progress == undefined) {
			let delta = Math.abs(parseFloat(max) - parseFloat(min));
			if (delta > 0) {
				computedProgress = (parseFloat(current) * 100) / delta;
			}
		}
	});

	export {
		width,
		height,
		top,
		left,
		isInteractive,
		secondaryColor,
		primaryColor,
		style,
		min,
		max,
		current,
		containerID
	};
</script>

<svelte:window
	on:mouseup={() => {
		isMouseDown = false;
	}}
	on:mousemove={(e) => {
		if (isInteractive && isMouseDown) {
			let boundingBox = document.getElementById(containerID)?.getBoundingClientRect();
			let xStart = boundingBox?.x;
			let xEnd = boundingBox?.width + xStart;
			let percentage = RangeScaler(e.clientX, xStart, xEnd, 0, 100);
			if (percentage >= 0 && percentage <= 101) {
				progress = percentage;
			}
		}
	}}
/>
<div
	on:mousedown={() => {
		isMouseDown = true;
	}}
	class="progressBarContainer"
	id={containerID}
	style="position: absolute; top: {top}; left: {left}; width: {width}; height: {progressBarHeight}; background-color: {secondaryColor
		? secondaryColor
		: '#99999920'}; {style}"
>
	<div
		class="barActual"
		style="background-color: {primaryColor ? primaryColor : '#FFFFFF20'}; left: {parseFloat(
			`${parseInt(progress) ? parseInt(progress) : computedProgress}`
		) - 100}%;"
	/>
</div>

<style>
	.progressBarContainer {
		border-radius: 5px;
		overflow: hidden;
	}
	.barActual {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
	}
</style>
