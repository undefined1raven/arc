<script>
	import { fly } from 'svelte/transition';
	import { getTransition } from '../../../fn/getTransisitions';
	import Box from '../../common/Box.svelte';
	import Button from '../../common/Button.svelte';
	import Label from '../../common/Label.svelte';
	import Ex7Deco from '../../deco/EX7Deco.svelte';
	import List from '../../common/List.svelte';
	import ListItem from '../../common/ListItem.svelte';
	import globalStyle from '../../../stores/globalStyles';
	import { activeTessApp } from '../activeTessApp';
	import Input from '../../common/Input.svelte';
	import Textarea from '../../common/Textarea.svelte';
	import InfoPanel from './InfoPanel.svelte';
	import VerticalLine from '../../common/VerticalLine.svelte';
	import TasksPanel from './TasksPanel.svelte';
	import { priorityArray, projects, statusArray } from '../TessVault';
	import { selectedProject } from './selectedProject';
	import DropdownDeco from '../../deco/DropdownDeco.svelte';
	import AddDeco from '../../deco/AddDeco.svelte';
	import { v4 } from 'uuid';
	import getRandomInt from '../../../fn/getRandomInt';
	import { onMount } from 'svelte';
	import isMobile from '../../../fn/isMobile';
	function getStatusFromID(id) {
		return $statusArray.find((elm) => elm.id === id);
	}

	function getPriorityFromID(id) {
		return $priorityArray.find((elm) => elm.id === id);
	}

	let isShowingProjectMenu = true;
</script>


{#if isMobile() === false}
	{#if isShowingProjectMenu === false}
		<InfoPanel />
		<TasksPanel />
		<Button
			onClick={() => {
				isShowingProjectMenu = true;
			}}
			hoverOpacityMin={0}
			hoverOpacityMax={20}
			transitions={getTransition(3)}
			figmaImport={{ desktop: { top: 118, left: 160, width: 108, height: 51 } }}
			><DropdownDeco width="80%" height="80%" /></Button
		>
		<Box
			transitions={getTransition(3)}
			figmaImport={{ desktop: { top: 186, left: 664, width: 3, height: 672 } }}
		>
			<VerticalLine width="100%" height="100%" color={$globalStyle.activeColor} /></Box
		>
		<Box
			transitions={getTransition(6)}
			figmaImport={{ desktop: { top: 186, left: 1234, width: 3, height: 672 } }}
		>
			<VerticalLine width="100%" height="100%" color={$globalStyle.activeColor} /></Box
		>
	{/if}

	{#if isShowingProjectMenu === true}
		<Button
			onClick={() => {
				projects.update((prev) => {
					prev = [
						...prev,
						{
							PID: `PMF-${v4()}`,
							objective: '[]',
							startUnix: Date.now(),
							tasks: [],
							priorityID: 'PIX-1',
							description: '[]',
							logs: [],
							name: 'Project-' + getRandomInt(100, 999),
							statusID: 'STID-2'
						}
					];
					return prev;
				});
			}}
			hoverOpacityMax={30}
			hoverOpacityMin={0}
			transitions={getTransition(2)}
			desktopFont={$globalStyle.mediumDesktopFont}
			figmaImport={{ desktop: { top: 90, left: 390, width: 275, height: 61 } }}
			label="New Project"><AddDeco width="10%" height="50%" left="2%" /></Button
		>
		<Box
			horizontalCenter={true}
			figmaImport={{ desktop: { top: 178, left: '50%', width: 1243, height: 765 } }}
		>
			<List style="flex-wrap: wrap;" width="100%" height="100%" direction="row">
				{#each $projects as project, ix}
					<ListItem
						transitions={getTransition(ix)}
						marginBottom="2%"
						style="margin-left: 4%; min-width: 25%; min-height: 30%;"
						width="25%"
						height="25%"
					>
						<Label
							desktopFont={$globalStyle.mediumDesktopFont}
							left="4%"
							top="15%"
							text={project.name}
						/>
						<Label
							left="4%"
							desktopFont={$globalStyle.smallDesktopFont}
							top="75%"
							height="15%"
							width="40%"
							text={getStatusFromID(project.statusID)?.name}
							color={getStatusFromID(project.statusID)?.color}
							borderColor={getStatusFromID(project.statusID)?.color}
						/>
						<Label
							style="right: 4%"
							desktopFont={$globalStyle.smallDesktopFont}
							top="75%"
							height="15%"
							width="30%"
							text={getPriorityFromID(project.priorityID)?.name}
							color={getPriorityFromID(project.priorityID)?.color}
							borderColor={getPriorityFromID(project.priorityID)?.color}
						/>
						<Label
							style="right: 3%; white-space: nowrap;"
							desktopFont={$globalStyle.verySmallDesktopFont}
							top="14%"
							height="15%"
							width="30%"
							text={project.PID.substring(0, 10)}
						/>
						<Button
							onClick={() => {
								selectedProject.set({ ...project, ini: true, ix: ix });
								isShowingProjectMenu = false;
							}}
							hoverOpacityMin={0}
							hoverOpacityMax={20}
							width="100%"
							height="100%"
						/>
					</ListItem>
				{/each}
			</List>
		</Box>
	{/if}
{/if}
