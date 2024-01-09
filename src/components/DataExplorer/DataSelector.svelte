<script lang="ts">
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import { dataExplorerParams } from './dataExplorerParams';
	import { categories, tasks } from '../../stores/dayViewSelectedDay';
	import List from '../common/List.svelte';
	import ListItem from '../common/ListItem.svelte';

	let selectedDataSource = 'tasks'; // tasks | categories | groups
	const menuButtonStyle = `border-radius: 0px; border: none; border-bottom: solid 1px ${$globalStyle.activeColor}; border-left: solid 1px ${$globalStyle.activeColor};`;
	const containerConfig = { containerWidth: 336, containerHeight: 402 };

	$: dataExplorerParamsKey =
		selectedDataSource === 'tasks' ? 'selectedTaskIDs' : 'selectedCategoriesIDs';
</script>

<Box
	horizontalCenter={true}
	borderColor={$globalStyle.activeColor}
	figmaImport={{
		mobile: {
			top: 119,
			left: '50%',
			width: containerConfig.containerWidth,
			height: containerConfig.containerHeight
		}
	}}
>
	{#if selectedDataSource === 'tasks' || selectedDataSource === 'categories'}
		<List
			figmaImport={{ mobile: { left: 8, width: 320, height: 350, top: 50 } }}
			figmaImportConfig={containerConfig}
		>
			{#each selectedDataSource === 'tasks' ? $tasks.filter((elm) => elm.active === true) : $categories.filter((elm) => elm.active === true) as element, ix}
				<ListItem
					transitions={getTransition(ix + 1)}
					width="100%"
					height="12%"
					style="min-height: 12%;"
					marginBottom="5%"
				>
					<Button
						onClick={() => {
							const elementIndexInDataExplorerParams = $dataExplorerParams[
								dataExplorerParamsKey
							].indexOf(element.id);
							if (elementIndexInDataExplorerParams === -1) {
								dataExplorerParams.update((prev) => {
									prev[dataExplorerParamsKey] = [...prev[dataExplorerParamsKey], element.id];
									return prev;
								});
							} else {
								dataExplorerParams.update((prev) => {
									prev[dataExplorerParamsKey].splice(elementIndexInDataExplorerParams, 1);
									return prev;
								});
							}
						}}
						isSelected={$dataExplorerParams[dataExplorerParamsKey].indexOf(element.id) !== -1}
						hoverOpacityMax={20}
						hoverOpacityMin={0}
						label={element.name}
						width="100%"
						align="left"
						alignPadding="4%"
						height="100%"
					/>
					{#if $dataExplorerParams[dataExplorerParamsKey].indexOf(element.id) !== -1}
						<Label left="90%" text="⛶" />
					{/if}
				</ListItem>
			{/each}
		</List>
	{/if}
	<Button
		transitions={getTransition(1)}
		style="{menuButtonStyle} border-left: none; border-top-left-radius: {$globalStyle.borderRadius};"
		label="Tasks"
		onClick={() => (selectedDataSource = 'tasks')}
		isSelected={selectedDataSource === 'tasks'}
		figmaImport={{ mobile: { left: '0', top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
	<Button
		style={menuButtonStyle}
		transitions={getTransition(2)}
		label="Categories"
		onClick={() => (selectedDataSource = 'categories')}
		isSelected={selectedDataSource === 'categories'}
		figmaImport={{ mobile: { left: 112, top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
	<Button
		transitions={getTransition(3)}
		style="{menuButtonStyle} border-top-right-radius: {$globalStyle.borderRadius};"
		label="Task Groups"
		isSelected={selectedDataSource === 'groups'}
		onClick={() => (selectedDataSource = 'groups')}
		figmaImport={{ mobile: { left: 223, top: '0', width: 112, height: 42 } }}
		figmaImportConfig={containerConfig}
	/>
</Box>
