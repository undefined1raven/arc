<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import { fly } from 'svelte/transition';
	import {
		categories,
		dayViewSelectedDay,
		days,
		tasks,
		tasksLog
	} from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';
	import VerticalLine from '../common/VerticalLine.svelte';
</script>

<Box
	transitions={{ in: { func: fly, options: { duration: 300, y: '-15%' } } }}
	figmaImport={{ mobile: { top: 39, width: 350, left: '50%', height: 50 } }}
	horizontalCenter={true}
	><Button
		label="Download Key"
		width="100%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
	/></Box
>
<Box
	transitions={{ in: { func: fly, options: { delay: 100, duration: 300, y: '-15%' } } }}
	backgroundColor="{$globalStyle.errorColor}20"
	figmaImport={{ mobile: { top: 97, width: 350, left: '50%', height: 55 } }}
	horizontalCenter={true}
	><Label
		text="Store the key both on this device and on another one as a backup but
        never share it with anyone"
		width="100%"
		height="100%"
		verticalFont={$globalStyle.mediumMobileFont}
		color={$globalStyle.errorColor}
	/></Box
>

<HorizontalLine
	color={$globalStyle.activeColor}
	width="97.222222222%"
	top="25.5%"
	left="50%"
	style="transform: translate(-50%); height: 0.11vh;
"
/>

<Box
	transitions={{ in: { func: fly, options: { delay: 200, duration: 300, y: '-15%' } } }}
	figmaImport={{ mobile: { top: 180, width: 350, left: '50%', height: 50 } }}
	horizontalCenter={true}
	><Button
		label="Nuke account and data"
		width="100%"
		height="100%"
		color={$globalStyle.errorColor}
		backgroundColor={$globalStyle.errorColor}
		borderColor={$globalStyle.errorColor}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
	/></Box
>
<Box
	transitions={{ in: { func: fly, options: { duration: 300, y: '15%' } } }}
	figmaImport={{ mobile: { top: 522, width: 350, left: '50%', height: 50 } }}
	horizontalCenter={true}
	><Button
		label="Log Out"
		width="100%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
	/></Box
>

<MenuBar buttons={['logs', 'home', 'edit']} />
