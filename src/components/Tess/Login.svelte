<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import TessDeco from '../deco/TessDeco.svelte';
	import NumericalInput from '../common/NumericalInput.svelte';
	import PinDeco from '../deco/PINDeco.svelte';
	import Input from '../common/Input.svelte';

	let input = '';

	$: {
		if (input.toString() !== '000000' && input.toString().length === 6) {
			input = '';
		}
	}

</script>

<Box
	figmaImport={{ mobile: { top: 31, left: '50%', width: 344, height: 79 } }}
	backgroundColor="{$globalStyle.activeColor}10"
	horizontalCenter={true}
>
	<Label
		text="TESS-AVN"
		style="letter-spacing: 0.4vh;"
		color={$globalStyle.activeColor}
		left="2%"
	/>
	<TessDeco left="74%" width="25%" height="100%" />
</Box>
<PinDeco
	digits={input.toString().length}
	width="40%"
	height="70%"
	left="50%"
	style="transform: translate(-50%);"
/>
<NumericalInput
	autofocus={true}
	bind:value={input}
	width="100%"
	height="80%"
	top="18%"
	style="opacity: 0.001; z-index: 150;"
/>
