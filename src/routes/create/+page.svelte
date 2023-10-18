<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import CreateAccountMain from '../../components/CreateAccount/CreateAccountMain.svelte';
	import isMobile from '../../fn/isMobile';

	let renderedComponent;

	onMount(() => {
		if (isMobile()) {
			renderedComponent = new CreateAccountMain({
				target: document.documentElement
			});
		}
	});

	onDestroy(() => {
		if (renderedComponent) {
			renderedComponent.$destroy();
		}
	});
</script>
