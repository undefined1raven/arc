<script>
	let height = '100%';
	let width = '0.02vh';
	let color = '#FFF';
	let top = 'auto';
	let left = 'auto';
	let style = '';

	export { height, color, top, left, style, width };
</script>


<div class="vLine" style="top: {top}; left: {left}; background-color: {color}; height: {height}; width: {width}; {style}" />

<style>
	.vLine {
		position: absolute;
		width: 0.02vh;
	}
</style>
