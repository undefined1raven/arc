<script lang="ts">
	import Box from '../components/common/Box.svelte';
	import Label from '../components/common/Label.svelte';
	import Button from '../components/common/Button.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import globalStyle from '../stores/globalStyles';
	import HomeMain from '../components/Home/HomeMain.svelte';
	import { onDestroy } from 'svelte';

	let renderedComponent = new HomeMain({
		target: document.body
	});

	onDestroy(() => {
		renderedComponent.$$destroy();
	});
</script>
