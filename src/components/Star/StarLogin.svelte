<script lang="ts">
	import { onMount } from 'svelte';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import InstaLogo from '../deco/InstaLogo.svelte';
	import StarDeco from '../deco/StarDeco.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import PasswordInput from '../common/PasswordInput.svelte';
	import bcrypt from 'bcryptjs';
	import { starAccess, starPassword } from './starPassword';
	import FltProcessRestartDeco from '../deco/FLTProcessRestartDeco.svelte';
	let starHash = localStorage.getItem('starHash');
	let newPassword = '';
	let newPasswordConfirmation = '';
	let attemptedPasswordConfirmation = false;
	$: newPasswordMatching =
		!attemptedPasswordConfirmation ||
		(attemptedPasswordConfirmation && newPassword === newPasswordConfirmation);

	onMount(() => {
		if ($starAccess === true) {
			window.location.hash = '#home';
		}
	});
</script>

{#if starHash === 'none'}
	<Label
		figmaImport={{ mobile: { top: 98, left: 10 } }}
		text="Set Star Vault Password"
		verticalFont={$globalStyle.mediumMobileFont}
		transitions={getTransition(1)}
	/>
	<Box
		transitions={getTransition(2)}
		figmaImport={{ mobile: { top: 118, left: 10, width: 340, height: 45 } }}
	>
		<PasswordInput
			bind:value={newPassword}
			width="100%"
			height="100%"
			backgroundColor={$globalStyle.activeMono}
			verticalFont={$globalStyle.mediumMobileFont}
			borderColor={$globalStyle.activeMono}
		/>
	</Box>

	<Label
		figmaImport={{ mobile: { top: 189, left: 10 } }}
		text="Confirm Password"
		verticalFont={$globalStyle.mediumMobileFont}
		transitions={getTransition(3)}
	/>
	<Box
		transitions={getTransition(4)}
		figmaImport={{ mobile: { top: 209, left: 10, width: 340, height: 45 } }}
	>
		<PasswordInput
			bind:value={newPasswordConfirmation}
			on:onValue={() => {
				attemptedPasswordConfirmation = true;
			}}
			width="100%"
			backgroundColor={$globalStyle.activeMono}
			height="100%"
			verticalFont={$globalStyle.mediumMobileFont}
			borderColor={$globalStyle.activeMono}
		/>
	</Box>
	{#if newPassword.length > 0 && newPasswordConfirmation.length > 0}
		<Button
			onClick={() => {
				if (newPassword === newPasswordConfirmation && newPassword.length >= 7) {
					bcrypt
						.hash(newPassword, 13)
						.then((res) => {
							localStorage.setItem('starHash', res);
							starAccess.set(true);
							window.location.hash = '#home';
						})
						.catch((e) => {
							console.log(e);
						});
				}
			}}
			label={newPasswordMatching ? 'Next' : 'Passwords do not match'}
			color={newPasswordMatching ? $globalStyle.activeMono : $globalStyle.errorColor}
			horizontalCenter={true}
			hoverOpacityMin={0}
			hoverOpacityMax={newPasswordMatching ? 20 : 0}
			borderColor={newPasswordMatching ? $globalStyle.activeMono : $globalStyle.errorColor + '00'}
			transitions={getTransition(5)}
			figmaImport={{ mobile: { top: 295, left: '50%', width: 282, height: 49 } }}
		/>
	{/if}
	{#if newPassword.length < 7}
		<Label
			horizontalCenter={true}
			figmaImport={{ mobile: { top: 260, left: '50%', width: '95%' } }}
			text="Password must have at least 7 chars"
			verticalFont={$globalStyle.mediumMobileFont}
			transitions={getTransition(2)}
			color={$globalStyle.errorColor}
		/>
	{/if}
{/if}

{#if starHash !== 'none'}
	<Label
		figmaImport={{ mobile: { top: 98, left: 10 } }}
		text="Enter Star Vault Password"
		verticalFont={$globalStyle.mediumMobileFont}
		transitions={getTransition(1)}
	/>
	<Label
		figmaImport={{ mobile: { top: 120, left: 10 } }}
		text={!$starAccess ? 'No Match' : 'Password Matched'}
		verticalFont={$globalStyle.mediumMobileFont}
		transitions={getTransition(2.5)}
		color={!$starAccess ? $globalStyle.errorColor : $globalStyle.successColor}
	/>
	<PasswordInput
		autofocus={true}
		on:onValue={(e) => {
			const password = e.detail;
			if (password.length > 5) {
				starPassword.set(password);
				bcrypt.compare(password, starHash).then((res) => {
					if (res === true) {
						starAccess.set(true);
						setTimeout(() => {
							window.location.hash = '#home';
						}, 100);
					}
				});
			}
		}}
		style="opacity: 0.004;"
		width="100%"
		height="84%"
		top="15%"
	/>
{/if}

<Box
	transitions={getTransition(1)}
	figmaImport={{ mobile: { top: 578, left: 10, width: 340, height: 50 } }}
>
	<Label text="Reset Star Vault" left="18%" />
	<FltProcessRestartDeco left="0%" height="60%" width="15%" color={$globalStyle.activeMono} />
	<Button
		onClick={() => {
			localStorage.removeItem('starArchiveVersion');
			localStorage.removeItem('starArchiveNameMap');
			localStorage.removeItem('starHash');
			const DBDeleteRequest = window.indexedDB.deleteDatabase('messageArchives');

			DBDeleteRequest.onerror = (event) => {
				console.error('Error deleting database.');
			};

			DBDeleteRequest.onsuccess = (event) => {
				window.location.reload();
			};
		}}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		borderColor={$globalStyle.activeMono}
		width="100%"
		height="100%"
	/>
</Box>
