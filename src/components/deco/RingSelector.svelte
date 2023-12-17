<script>
	import globalStyle from '../../stores/globalStyles';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let lglobalStyles = $globalStyle;
	globalStyle.subscribe((gs) => {
		lglobalStyles = gs;
	});
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let color = lglobalStyles.activeColor;
	let selectedRing = 4;

	function onSelectedRing(ringID) {
		selectedRing = ringID;
		dispatch('onSelectedRing', ringID);
	}

	export { height, width, left, top, style, color, selectedRing };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 150 112"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		on:click={() => {
			onSelectedRing(1);
		}}
		d="M14.2812 51.7207L0.57735 27.9849L14.2812 4.24911H41.6889L55.3928 27.9849L41.6889 51.7207H14.2812Z"
		fill-opacity={selectedRing === 1 ? 0.2 : 0}
		stroke-opacity={selectedRing === 1 ? 1 : 0.3}
		fill="#AD44FF"
		stroke="#AD44FF"
	/>
	<path
		d="M24.33 32V31.146H26.808V23.194H24.862V22.76L25.408 22.34H27.732V31.146H29.986V32H24.33Z"
		fill="#DBADFF"
	/>
	<path
		on:click={() => {
			onSelectedRing(0);
		}}
		fill="#AD44FF"
		fill-opacity={selectedRing === 0 ? 0.2 : 0}
		stroke-opacity={selectedRing === 0 ? 1 : 0.3}
		stroke="#AD44FF"
		d="M61.2812 79.7507L47.5774 56.0149L61.2812 32.2791H88.6889L102.393 56.0149L88.6889 79.7507H61.2812Z"
	/>
	<path
		d="M71.938 57.914V52.426C71.938 51.0353 72.6333 50.34 74.024 50.34H76.068C77.4587 50.34 78.154 51.0353 78.154 52.426V57.914C78.154 59.3047 77.4587 60 76.068 60H74.024C72.6333 60 71.938 59.3047 71.938 57.914ZM72.876 58.054C72.876 58.782 73.2447 59.146 73.982 59.146H76.11C76.8473 59.146 77.216 58.782 77.216 58.054V52.286C77.216 51.558 76.8473 51.194 76.11 51.194H73.982C73.2447 51.194 72.876 51.558 72.876 52.286V58.054Z"
		fill="#DBADFF"
	/>
	<path
		d="M108.281 51.7507L94.5774 28.0149L108.281 4.27914H135.689L149.393 28.0149L135.689 51.7507H108.281Z"
		on:click={() => {
			onSelectedRing(2);
		}}
		fill="#AD44FF"
		fill-opacity={selectedRing === 2 ? 0.2 : 0}
		stroke-opacity={selectedRing === 2 ? 1 : 0.3}
		stroke="#AD44FF"
	/>
	<path
		d="M118.938 32V29.116C118.938 27.9773 119.437 27.3053 120.436 27.1L123.39 26.512C123.941 26.4 124.216 26.0407 124.216 25.434V24.286C124.216 23.558 123.847 23.194 123.11 23.194H119.218V22.76L119.764 22.34H123.068C124.459 22.34 125.154 23.0353 125.154 24.426V25.336C125.154 26.4747 124.655 27.1467 123.656 27.352L120.702 27.94C120.151 28.052 119.876 28.4113 119.876 29.018V31.146H125.154V32H118.938Z"
		fill="#DBADFF"
	/>
	<path
		d="M108.281 107.751L94.5774 84.0149L108.281 60.2791H135.689L149.393 84.0149L135.689 107.751H108.281Z"
		on:click={() => {
			onSelectedRing(3);
		}}
		fill="#AD44FF"
		fill-opacity={selectedRing === 3 ? 0.2 : 0}
		stroke-opacity={selectedRing === 3 ? 1 : 0.3}
		stroke="#AD44FF"
	/>
	<path
		d="M119.078 87.58V87.146H123.11C123.847 87.146 124.216 86.782 124.216 86.054V84.43C124.216 83.6927 123.847 83.324 123.11 83.324H120.114V82.484H123.11C123.847 82.484 124.216 82.1153 124.216 81.378V80.286C124.216 79.558 123.847 79.194 123.11 79.194H119.218V78.76L119.764 78.34H123.068C124.459 78.34 125.154 79.0353 125.154 80.426V81.476C125.154 81.8493 125.037 82.1527 124.804 82.386L124.314 82.876L124.804 83.366C125.037 83.5993 125.154 83.9027 125.154 84.276V85.914C125.154 87.3047 124.459 88 123.068 88H119.624L119.078 87.58Z"
		fill="#DBADFF"
	/>
	<path
		d="M14.2812 107.751L0.57735 84.0149L14.2812 60.2791H41.6889L55.3928 84.0149L41.6889 107.751H14.2812Z"
		on:click={() => {
			onSelectedRing(4);
		}}
		fill="#AD44FF"
		fill-opacity={selectedRing === 4 ? 0.2 : 0}
		stroke="#AD44FF"
		stroke-opacity={selectedRing === 4 ? 1 : 0.3}
	/>
	<path
		d="M23.938 86.082V85.312L27.256 78.34H28.026L28.152 78.578L24.974 85.242H29.216V81.98H30.154V88H29.216V86.082H23.938Z"
		fill="#DBADFF"
	/>
</svg>

<style>
	path {
		transition: all linear 0.2s;
	}
</style>
