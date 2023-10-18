<script lang="ts">
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import Button from '../common/Button.svelte';
	import HorizontalLine from '../common/HorizontalLine.svelte';
	import globalStyle from '../../stores/globalStyles';
	import Logo from '../deco/Logo.svelte';
	import ListItem from '../common/ListItem.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { categories, dayViewSelectedDay, tasks } from '../../stores/dayViewSelectedDay';
	import MenuBar from '../MenuBar.svelte';
	import Input from '../common/Input.svelte';

	const width = 350;
	const topOffset = 5;

	let newCategoryName = '';

	function getTime(unix) {
		const date = new Date(parseInt(unix));
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}

	let categoriesCopy = $categories;

	function onCategoriesCopyChange(categoriesCopy) {
		categories.update((old) => {
			old = categoriesCopy;
			return old;
		});
	}

	$: onCategoriesCopyChange(categoriesCopy);
</script>

<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor};"
	figmaImport={{ mobile: { top: 78 + topOffset, width: width, height: 400, left: '50%' } }}
	horizontalCenter={true}
	><ul class="tasksList">
		{#each categoriesCopy.filter((elm) => elm.id !== 'null' && elm.active === true) as category, ix}
			<ListItem width="99%" height="10%" style="margin-bottom: 3%; margin-top: 0.5%;">
				<Box
					width="100%"
					height="100%"
					transitions={{
						in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
					}}
				>
					<Input
						width="70%"
						left="0%"
						height="99%"
						backgroundColor={$globalStyle.activeColor}
						color={$globalStyle.activeMono}
						bind:value={category.name}
						style="padding-left: 1%; border: solid 1px {$globalStyle.activeColor}00;"
						transitions={{
							in: { func: fly, options: { delay: ix * 80, duration: 200, y: '-4%' } }
						}}
					/>
					<Button
						onClick={() => {
							tasks.update((old) => {
								let newTasks = [];
								for (let ix = 0; ix < old.length; ix++) {
									if (
										old[ix].categoryID.toString() === category.id.toString() &&
										old[ix].active === true
									) {
										newTasks.push({ ...old[ix], categoryID: 'null' });
									} else {
										newTasks.push({ ...old[ix] });
									}
								}
								return newTasks;
							});
							let ixx = categoriesCopy.indexOf(category);
							categoriesCopy[ixx] = { ...categoriesCopy[ixx], active: false };
						}}
						label="Delete"
						width="25%"
						height="100%"
						left="75%"
						hoverOpacityMin={0}
						hoverOpacityMax={20}
						color={$globalStyle.errorColor}
						backgroundColor={$globalStyle.errorColor}
						borderColor={$globalStyle.errorColor}
					/>
				</Box>
			</ListItem>
		{/each}
	</ul></Box
>

<Box
	transitions={{
		in: { func: fly, options: { delay: 50, duration: 200, y: '20%' } }
	}}
	figmaImport={{ mobile: { top: 518, width: 129, height: 44, left: 226 } }}
>
	<Button
		onClick={() => {
			if (
				newCategoryName.length > 0 &&
				newCategoryName.length < 20 &&
				!categoriesCopy.find((elm) => elm.name === newCategoryName)
			) {
				categoriesCopy.push({
					id: `CAT-${Math.random().toString().split('.')[1]}`,
					name: newCategoryName,
					active: true
				});
				categoriesCopy = categoriesCopy;
				newCategoryName = '';
			}
		}}
		width="100%"
		height="100%"
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		label="Add Category"
	/>
</Box>

<Box
	transitions={{
		in: { func: fly, options: { delay: 50, duration: 200, y: '20%' } }
	}}
	figmaImport={{ mobile: { top: 518, width: 212, height: 44, left: 5 } }}
>
	<Input
		backgroundColor={$globalStyle.activeColor}
		bind:value={newCategoryName}
		width="100%"
		height="100%"
	/>
</Box>
