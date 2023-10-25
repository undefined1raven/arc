<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Login from './Login.svelte';
	import { onMount } from 'svelte';

	const hashToComponent = {
		'#login': Login
	};

	onMount(() => {
		window.location.hash = '#login';
	});
</script>

<Login />
