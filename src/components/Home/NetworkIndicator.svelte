<script lang="ts">
	import { fly } from 'svelte/transition';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import { isOnline } from '../../stores/online';
	import NetworkDeco from '../deco/NetworkDeco.svelte';

	const colorsHash = {
		'0': $globalStyle.errorColor,
		'1': $globalStyle.successColor,
		'-1': $globalStyle.activeColor,
		'-2': '#BD00FF'
	};
</script>

<Box
	transitions={{
		in: { func: fly, options: { duration: 400, y: '-50%' } }
	}}
	width="10%"
	height="100%"
	backgroundColor="{colorsHash[$isOnline.toString()]}20"
	style="right: 0%; border-bottom-right-radius: 0px; border-top-right-radius: 0px;"
	><NetworkDeco color={colorsHash[$isOnline.toString()]} width="80%" height="80%" /></Box
>
