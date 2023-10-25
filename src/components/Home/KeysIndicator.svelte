<script lang="ts">
	import { fly } from 'svelte/transition';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import { isOnline } from '../../stores/online';
	import KeyDeco from '../deco/KeyDeco.svelte';
	import { keysStatus } from '../../stores/keysStatus';
	import { getDynamicBorderRadius } from '../../fn/dynamicBorders';

	const colorsHash = {
		'0': $globalStyle.errorColor,
		'1': $globalStyle.successColor,
		'-1': $globalStyle.activeColor,
		'-2': '#BD00FF'
	};
</script>

<Box
	transitions={{
		in: { func: fly, options: { delay: 100, duration: 400, y: '-50%' } }
	}}
	width="10%"
	height="100%"
	backgroundColor="{colorsHash[$keysStatus.toString()]}20"
	style="right: 11%"
	borderRadius={getDynamicBorderRadius(1)}
	><KeyDeco color={colorsHash[$keysStatus.toString()]} width="80%" height="80%" /></Box
>
