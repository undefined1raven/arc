<script>
	import getFigmaImportConfig from '../../config/FigmaImportConfig';
	import FigmaImporter from '../../fn/figmaImporter';
	import readTransitions from '../../fn/readTransitions';
	import globalStyle from '../../stores/globalStyles';

	let width = '100%';
	let color = $globalStyle.activeColor;
	let top = 'auto';
	let left = 'auto';
	let style = '';
	let figmaImport = {};
	let transitions = {};
	let figmaImportConfig = { ...getFigmaImportConfig() };
	const { inFunc, inOptions, outFunc, outOptions } = readTransitions(transitions);

	export { width, color, top, left, style, figmaImport, figmaImportConfig, transitions };
</script>

<div
	in:inFunc={inOptions}
	out:outFunc={outOptions}
	class="hLine"
	style="top: {top}; left: {left}; background-color: {color}; width: {width}; {Object.keys(
		figmaImport
	).length > 0
		? FigmaImporter(figmaImport, figmaImportConfig)
		: ''} {style}"
/>

<style>
	.hLine {
		position: absolute;
		height: 0.2vh;
	}
</style>
