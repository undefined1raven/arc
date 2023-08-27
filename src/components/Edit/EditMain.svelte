<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import { fly } from 'svelte/transition';
	import { dayViewSelectedDay } from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';
	import RoutineEditor from './RoutineEditor.svelte';
	import CategoriesEditor from './CategoriesEditor.svelte';
	import TaskEditor from './TaskEditor.svelte';

	const width = 350;
	const topOffset = 5;

	const selectedEditorHash = {
		routine: RoutineEditor,
		categories: CategoriesEditor,
		tasks: TaskEditor
	};

	let selectedEditor = 'routine'; // 'routine' | 'categories' | 'tasks'
</script>

<Box
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '-15%' }
		}
	}}
	figmaImport={{ mobile: { top: 25 + topOffset, left: 5, width: 112, height: 40 } }}
>
	<Button
		width="100%"
		height="100%"
		onClick={() => {
			selectedEditor = 'routine';
		}}
		color={selectedEditor === 'routine' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
		backgroundColor={selectedEditor === 'routine'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		borderColor={selectedEditor === 'routine'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		label="Routine"
		hoverOpacityMin={selectedEditor === 'routine' ? 20 : 0}
		hoverOpacityMax={20}
	/>
</Box>

<Box
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '-15%' }
		}
	}}
	figmaImport={{ mobile: { top: 25 + topOffset, left: 124, width: 112, height: 40 } }}
>
	<Button
		width="100%"
		height="100%"
		onClick={() => {
			selectedEditor = 'categories';
		}}
		color={selectedEditor === 'categories' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
		backgroundColor={selectedEditor === 'categories'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		borderColor={selectedEditor === 'categories'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		label="Categories"
		hoverOpacityMin={selectedEditor === 'categories' ? 20 : 0}
		hoverOpacityMax={20}
	/>
</Box>
<Box
	transitions={{
		in: {
			func: fly,
			options: { duration: 200, y: '-15%' }
		}
	}}
	figmaImport={{ mobile: { top: 25 + topOffset, left: 243, width: 112, height: 40 } }}
>
	<Button
		onClick={() => {
			selectedEditor = 'tasks';
		}}
		width="100%"
		height="100%"
		color={selectedEditor === 'tasks' ? $globalStyle.activeMono : $globalStyle.secondaryMono}
		backgroundColor={selectedEditor === 'tasks'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		borderColor={selectedEditor === 'tasks'
			? $globalStyle.activeColor
			: $globalStyle.secondaryColor}
		label="Tasks"
		hoverOpacityMin={selectedEditor === 'tasks' ? 20 : 0}
		hoverOpacityMax={20}
	/>
</Box>

<svelte:component this={selectedEditorHash[selectedEditor]} />

<MenuBar buttons={['logs', 'home', 'settings']} />
