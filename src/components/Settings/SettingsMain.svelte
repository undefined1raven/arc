<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
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
	import { download } from '../../fn/download';
	import domainGetter from '../../fn/domainGetter';
	import { get } from 'svelte/store';
	import KeyDownloadDeco from '../deco/KeyDownloadDeco.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import DownloadDeco from '../deco/DownloadDeco.svelte';
	import AllLogoutDeco from '../deco/AllLogoutDeco.svelte';
	import DeleteAccountDeco from '../deco/DeleteAccountDeco.svelte';
	import { getAccountKeyPayload } from '../../fn/getAccountKeyPayload';
	import BackupManager from './BackupManager.svelte';
	import { passkeyAuth, passkeySetup } from '../Login/passkeySetup';
	import PasskeyDeco from '../deco/PasskeyDeco.svelte';

	let lockdownEnabled = false;
	let isBackupManagerVisible = false;
</script>

{#if isBackupManagerVisible === false}
	<Button
		hoverOpacityMin={0}
		onClick={() => {
			download(
				`arc_key_B${Date.now().toString().substring(5, 10)}.key.txt`,
				getAccountKeyPayload()
			);
		}}
		hoverOpacityMax={20}
		transitions={getTransition(1)}
		figmaImport={{ mobile: { top: 40, width: 350, left: '50%', height: 135 } }}
		horizontalCenter={true}
		><Label text="Download Key" top="15%" /><KeyDownloadDeco
			width="50%"
			height="60%"
			top="35%"
		/></Button
	>
	<Label
		transitions={getTransition(2)}
		text="Store the key both on this device and on another one as a backup but,
        never share it with anyone"
		figmaImport={{ mobile: { top: 182, width: 350, left: '50%', height: 42 } }}
		verticalFont={$globalStyle.smallMobileFont}
		backgroundColor="{$globalStyle.errorColor}20"
		color={$globalStyle.errorColor}
		horizontalCenter={true}
		borderRadius={$globalStyle.borderRadius}
	/>
	<Button
		onClick={() => {
			isBackupManagerVisible = true;
		}}
		transitions={getTransition(3)}
		figmaImport={{ mobile: { top: 237, left: '50%', width: 350, height: 50 } }}
		horizontalCenter={true}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		><Label text="Manage Backups" left="2%" /><DownloadDeco
			width="20%"
			left="80%"
			height="80%"
		/></Button
	>
	<Button
		onClick={() => {
			passkeySetup();
		}}
		onSelect={() => {
			passkeyAuth();
		}}
		borderColor={lockdownEnabled ? $globalStyle.successColor : $globalStyle.activeColor}
		backgroundColor={lockdownEnabled ? $globalStyle.successColor : $globalStyle.activeColor}
		color={lockdownEnabled ? $globalStyle.successColor : $globalStyle.activeMono}
		transitions={getTransition(4)}
		figmaImport={{ mobile: { top: 301, left: '50%', width: 350, height: 50 } }}
		horizontalCenter={true}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		><Label
			color={lockdownEnabled ? $globalStyle.successColor : $globalStyle.activeMono}
			top="38%"
			text="Register Passkey"
			left="2%"
		/><PasskeyDeco color={$globalStyle.activeColor} width="20%" height="70%" left="80%" /></Button
	>
	<Label
		transitions={getTransition(5)}
		backgroundColor="{$globalStyle.activeColor}20"
		text="When enabled, lockdown mode prevents anyone from logging into your account "
		figmaImport={{ mobile: { top: 357, width: 350, left: '50%', height: 42 } }}
		verticalFont={$globalStyle.smallMobileFont}
		horizontalCenter={true}
		borderRadius={$globalStyle.borderRadius}
	/>
	<Button
		transitions={getTransition(6)}
		figmaImport={{ mobile: { top: 413, left: '50%', width: 350, height: 50 } }}
		horizontalCenter={true}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		color={$globalStyle.errorColor}
		backgroundColor={$globalStyle.errorColor}
		borderColor={$globalStyle.errorColor}
		><Label
			top="38%"
			color={$globalStyle.errorColor}
			text="Nuke Account & Data"
			left="2%"
		/><DeleteAccountDeco
			color={$globalStyle.errorColor}
			width="20%"
			height="70%"
			left="80%"
		/></Button
	>
	<Box
		transitions={{ in: { func: fly, options: { duration: 300, y: '15%' } } }}
		figmaImport={{ mobile: { top: 515, width: 350, left: '50%', height: 50 } }}
		horizontalCenter={true}
		><Button
			onClick={() => {
				localStorage.removeItem('privateKey');
				localStorage.removeItem('accountID');
				localStorage.removeItem('simkey');
				localStorage.removeItem('tess_simkey');
				localStorage.removeItem('at');
				window.location.href = '/login';
			}}
			label="Log Out"
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={20}
		/></Box
	>

	<MenuBar buttons={['logs', 'home', 'edit']} />
{/if}

{#if isBackupManagerVisible === true}
	<BackupManager
		on:onBack={() => {
			isBackupManagerVisible = false;
		}}
	/>
{/if}
