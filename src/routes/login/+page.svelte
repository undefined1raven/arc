<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import LoginMain from '../../components/Login/LoginMain.svelte';
	import isMobile from '../../fn/isMobile';

	let renderedComponent;

	onMount(() => {
		renderedComponent = new LoginMain({
			target: document.documentElement
		});
	});

	onDestroy(() => {
		if (renderedComponent) {
			renderedComponent.$destroy();
		}
	});
</script>
