<script lang="ts">
	import { onMount } from 'svelte';
	import Label from '../../components/common/Label.svelte';
	import globalStyle from '../../stores/globalStyles'; 
</script>

<Label text="fuck you" color={$globalStyle.activeMono} />
