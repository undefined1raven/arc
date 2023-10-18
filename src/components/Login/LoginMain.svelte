<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { exportCryptoKey, importPrivateKey, str2ab } from '../../fn/crypto/keyOps';
	import decrypt from '../../fn/crypto/decrypt';
	import bcryptjs from 'bcryptjs';
	import { fade, fly } from 'svelte/transition';
	import domainGetter from '../../fn/domainGetter';

	let fileInput;
	let authStatus = {
		label: 'Enter Key',
		bkgColor: `${$globalStyle.activeColor}20`,
		color: $globalStyle.activeMono
	};

	function setAuthStatusToDefault() {
		authStatus = {
			label: 'Enter Key',
			bkgColor: `${$globalStyle.activeColor}20`,
			color: $globalStyle.activeMono
		};
	}

	function setAuthStatusToInvalidKey() {
		authStatus = {
			label: 'Invalid Key',
			bkgColor: `${$globalStyle.errorColor}20`,
			color: $globalStyle.errorColor
		};
		setTimeout(() => {
			setAuthStatusToDefault();
		}, 3000);
	}

	onMount(() => {
		setTimeout(() => {
			const reader = new FileReader();
			fileInput.addEventListener('change', (e) => {
				const fileList = e.target.files;
				reader.readAsText(fileList[0]);
				reader.addEventListener('load', (ex) => {
					try {
						let accountKey = JSON.parse(reader.result);
						if (
							accountKey.pk === undefined ||
							accountKey.id === undefined ||
							accountKey.simkey === undefined
						) {
							setAuthStatusToInvalidKey();
						} else {
							localStorage.setItem('privateKey', accountKey.pk);
							localStorage.setItem('accountID', accountKey.id);
							localStorage.setItem('simkey', accountKey.simkey);
							authStatus.label = '[Requesting Challenge]';
							fetch(domainGetter('/auth/requestChallenge'), {
								credentials: 'include',
								method: 'POST',
								body: JSON.stringify({ accountID: accountKey.id })
							}).then((res) => {
								res.json().then((data) => {
									if (data.error !== undefined) {
										authStatus = {
											label: 'Challenge Failed',
											bkgColor: `${$globalStyle.errorColor}20`,
											color: $globalStyle.errorColor
										};
										setTimeout(() => {
											setAuthStatusToDefault();
										}, 200);
									} else {
										authStatus.label = '[Solving Challenge]';
										try {
											if (data.success === true && data.challenge !== undefined) {
												importPrivateKey(JSON.parse(accountKey.pk)).then((privateKey) => {
													decrypt(str2ab(data.challenge), privateKey)
														.then((solution) => {
															fetch(domainGetter('/auth/verifySolution'), {
																method: 'POST',
																body: JSON.stringify({
																	accountID: accountKey.id,
																	solution: solution
																}),
																credentials: 'include'
															}).then((res) => {
																res
																	.json()
																	.then((data) => {
																		if (data.error === undefined && data.success === true) {
																			localStorage.setItem('at', data.at);
																			window.location.href = '/';
																		} else {
																			authStatus = {
																				label: 'Challenge Failed',
																				bkgColor: `${$globalStyle.errorColor}20`,
																				color: $globalStyle.errorColor
																			};
																			setTimeout(() => {
																				setAuthStatusToDefault();
																			}, 2000);
																		}
																	})
																	.catch((e) => {
																		authStatus = {
																			label: 'Something went wrong',
																			bkgColor: `${$globalStyle.errorColor}20`,
																			color: $globalStyle.errorColor
																		};
																		setTimeout(() => {
																			setAuthStatusToDefault();
																		}, 2000);
																	});
															});
														})
														.catch((e) => {
															authStatus = {
																label: 'Challenge Failed',
																bkgColor: `${$globalStyle.errorColor}20`,
																color: $globalStyle.errorColor
															};
															setTimeout(() => {
																setAuthStatusToDefault();
															}, 200);
														});
												});
											}
										} catch (e) {
											setAuthStatusToInvalidKey();
										}
									}
								});
							});
						}
					} catch (e) {
						setAuthStatusToInvalidKey();
					}
				});
			});
		}, 10);
	});
</script>

<div>
	<Box
		transitions={{ in: { func: fly, options: { duration: 700, y: '-10%' } } }}
		figmaImport={{ mobile: { top: '0%', left: '0%', width: '100%', height: 103 } }}
	>
		<Logo width="50%" height="60%" />
		<HorizontalLine
			style="background: radial-gradient(50% 50.00% at 50% 50.00%, #2400FF 0%, rgba(36, 0, 255, 0.10) 100%);"
			top="100%"
		/>
	</Box>
	<Box
		figmaImport={{ mobile: { top: 139, left: '50%', width: 250, height: 30 } }}
		horizontalCenter={true}
		transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
		><Label
			width="100%"
			height="100%"
			color={authStatus.color}
			borderRadius="5px"
			backgroundColor={authStatus.bkgColor}
			text={authStatus.label}
		/></Box
	>
	<Box
		figmaImport={{ mobile: { top: 195, left: '50%', width: 250, height: 250 } }}
		backgroundColor="{$globalStyle.activeColor}20"
		horizontalCenter={true}
		transitions={{ in: { func: fly, options: { duration: 350, y: '5%' } } }}
		><Button
			style="overflow: hidden;"
			width="100%"
			height="100%"
			hoverOpacityMin={0}
			hoverOpacityMax={10}
			borderRadius="5px"
		>
			<input bind:this={fileInput} class="keyInput" type="file" /></Button
		>
	</Box>
	<Label
		figmaImport={{ mobile: { top: 469, left: '50%', width: 250, height: 44 } }}
		horizontalCenter={true}
		text="or"
	/>
	<Button
		onClick={() => {
			window.location.href = '/create';
		}}
		figmaImport={{ mobile: { top: 534, left: '50%', width: 250, height: 44 } }}
		horizontalCenter={true}
		label="Create Account"
	/>
</div>

<style>
	.keyInput {
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0.001;
	}
</style>
