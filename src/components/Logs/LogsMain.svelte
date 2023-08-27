<script lang="ts">
	import Box from '../../components/common/Box.svelte';
	import Label from '../../components/common/Label.svelte';
	import Button from '../../components/common/Button.svelte';
	import HorizontalLine from '../../components/common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import getNewKey from '../../fn/crypto/getNewKey';
	import { exportCryptoKey, importPrivateKey } from '../../fn/crypto/keyOps';
	import encrypt from '../../fn/crypto/encrypt';
	import decrypt from '../../fn/crypto/decrypt';
	import bcryptjs from 'bcryptjs';
	import { fly } from 'svelte/transition';
	import MenuBar from '../MenuBar.svelte';
	import { dayViewSelectedDay, days } from '../../stores/dayViewSelectedDay';

	const width = 350;
	const topOffset = 5;

	$: dayViews = $days;

	function appendDateToDayViews() {
		for (let ix = 0; ix < dayViews.length; ix++) {
			dayViews[ix]['date'] = new Date(dayViews[ix].startUnix);
		}
	}

	$: appendDateToDayViews(dayViews);

	function getMonth(unix) {
		const date = new Date(parseInt(unix));
		const month = date.toLocaleString('default', { month: 'short' });
		return month;
	}

	const colorHash = {
		pending: $globalStyle.activeColor,
		success: $globalStyle.successColor,
		fail: $globalStyle.errorColor,
		true: $globalStyle.successColor,
		false: $globalStyle.errorColor
	};

	function getTimeStr(unix) {
		const date = new Date(parseInt(unix));
		const dateNumber = date.getDate();
		const month = date.toLocaleString([], { month: 'short' });
		const year = date.getFullYear();
		return `${dateNumber} ${month} ${year}`;
	}
</script>

<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor}"
	figmaImport={{ mobile: { top: 25 + topOffset, width: width, height: 490, left: '50%' } }}
	horizontalCenter={true}
	><ul class="tasksList">
		{#each $days as day, ix}
			<ListItem width="99%" height="8%" style="margin-bottom: 3%; margin-top: 0.5%;">
				<Box
					width="100%"
					height="100%"
					transitions={{ in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } } }}
				>
					<Button
						onClick={() => {
							dayViewSelectedDay.set(day);
							window.location.hash = 'dayView';
						}}
						width="99%"
						height="99%"
						hoverOpacityMin={0}
						hoverOpacityMax={20}
						style="border: solid 1px {colorHash[day.status]};"
						transitions={{
							in: { func: fly, options: { delay: 80 * ix, duration: 200, y: '-4%' } }
						}}
					>
						<Label
							left="0%"
							width="40%"
							height="100%"
							backgroundColor={colorHash[day.status] + '20'}
							text={getTimeStr(day.dayStartUnix)}
							color={colorHash[day.status]}
							style="padding-left: 2%; padding-right: 2%; border-right: solid 1px {colorHash[
								day.status
							]};"
						/>
						<Label
							width="25%"
							height="50%"
							text="Routine"
							style="right: 2%;"
							backgroundColor="{day.status === 'pending'
								? $globalStyle.activeColor
								: colorHash[day.routine]}20"
							color={day.status === 'pending' ? $globalStyle.activeColor : colorHash[day.routine]}
							borderRadius="3px"
						/>
					</Button>
				</Box>
			</ListItem>
		{/each}
	</ul></Box
>
<Button
	onClick={() => {
		// window.location.hash = 'stats';
	}}
	label="Global Stats [Coming Soon]"
	color={$globalStyle.activeMono}
	borderColor={$globalStyle.activeColor}
	backgroundColor={$globalStyle.activeColor}
	hoverOpacityMin={0}
	hoverOpacityMax={20}
	figmaImport={{ mobile: { top: 523 + topOffset, left: '50%', width: width, height: 44 } }}
	horizontalCenter={true}
/>

<MenuBar buttons={['edit', 'home', 'settings']} />

<style>
	.tasksList {
		position: absolute;
		left: 0%;
		top: 0%;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: scroll;
	}
</style>
