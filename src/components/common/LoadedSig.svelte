<script>
	import { onMount, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
	let mounted = false;
	onMount(() => {
		dispatch('loaded');
	});
</script>
