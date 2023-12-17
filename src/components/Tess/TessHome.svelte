<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';
	import windowHash from '../../stores/windowHash';
	import { tessPIN } from '../../stores/tessPIN';
	import RingDeco from '../deco/RingDeco.svelte';
	import TessMain from './TessMain.svelte';
	import TessMainMenu from './TessMainMenu.svelte';
	import { activeTessApp } from './activeTessApp';
	import Ex7Main from './EX7Main.svelte';
	import PmmMain from './desktop/PMMMain.svelte';

	const tessAppToComponent = { menu: TessMainMenu, ex7: Ex7Main, pmm: PmmMain };
</script>

<svelte:component this={tessAppToComponent[$activeTessApp]} />
