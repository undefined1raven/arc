<script>
	import getFigmaImportConfig from '../../config/FigmaImportConfig';
	import FigmaImporter from '../../fn/figmaImporter';
	import readTransitions from '../../fn/readTransitions';
	let height = '100%';
	let width = '0.02vh';
	let color = '#FFF';
	let top = 'auto';
	let left = 'auto';
	let style = '';
	let transitions = {};
	let figmaImport = {};
	let figmaImportConfig = { ...getFigmaImportConfig() };

	const { inFunc, inOptions, outFunc, outOptions } = readTransitions(transitions);

	export { height, color, top, left, style, width, figmaImport, figmaImportConfig, transitions };
</script>

<div
	in:inFunc={inOptions}
	out:outFunc={outOptions}
	class="vLine"
	style="top: {top}; left: {left}; background-color: {color}; height: {height}; width: {width}; {Object.keys(
		figmaImport
	).length > 0
		? FigmaImporter(figmaImport, figmaImportConfig)
		: ''} {style}"
/>

<style>
	.vLine {
		position: absolute;
		width: 0.02vh;
	}
</style>
