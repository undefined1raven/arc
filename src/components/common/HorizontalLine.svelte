<script>
	let width = '100%';
	let color = '#FFF';
	let top = 'auto';
	let left = 'auto';
	let style = '';

	export { width, color, top, left, style };
</script>

<div
	class="hLine"
	style="top: {top}; left: {left}; background-color: {color}; width: {width}; {style}"
/>

<style>
	.hLine {
		position: absolute;
		height: 0.2vh;
	}
</style>
