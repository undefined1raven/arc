<script>
	import screenSize from '../../../stores/screenSize';
	import Box from '../Box.svelte';
	import Label from '../Label.svelte';
	var layoutManager = {
		fullLeft: { component: Label, id: 'none' },
		fullRight: { component: Label, id: 'none' },
		fullTop: { component: Label, id: 'none' },
		fullBottom: { component: Label, id: 'none' },
		full: { component: Label, id: 'none' },
		topRight: { component: Label, id: 'none' },
		topLeft: { component: Label, id: 'none' },
		bottomRight: { component: Label, id: 'none' },
		bottomLeft: { component: Label, id: 'none' }
	};

	$: minimized = $screenSize.minimized;

	var layoutConfig = {
		baseLayout: {
			desktop: { top: 103, left: 150, width: 1618, height: 962 }
		},
		fullLeft: {
			desktop: { top: '0%', left: '0%', height: 962, width: 800 }
		},
		fullRight: {
			desktop: { top: '0%', left: 819, height: 962, width: 800 }
		},
		fullTop: {
			desktop: { top: '0%', left: '0%', height: 473, width: 1618 }
		},
		fullBottom: {
			desktop: { top: 489, left: '0%', height: 473, width: 1618 }
		},
		full: {
			desktop: { top: '0%', left: '0%', height: 962, width: 1618 }
		},
		topRight: {
			desktop: { top: '0%', left: 819, height: 473, width: 800 }
		},
		topLeft: { desktop: { top: '0%', left: '0%', height: 473, width: 800 } },
		bottomRight: { desktop: { top: 489, left: 819, height: 473, width: 800 } },
		bottomLeft: { desktop: { top: 489, left: '0%', height: 473, width: 800 } }
	};

	const baseLayoutContainer = { containerWidth: 1618, containerHeight: 962 };


	export { layoutManager, baseLayoutContainer, layoutConfig };
</script>

<Box className="baseLayout" figmaImport={layoutConfig.baseLayout}>
	<Box
		className="fullLeft"
		figmaImportConfig={baseLayoutContainer}
		figmaImport={minimized === false ? layoutConfig.fullLeft : layoutConfig.baseLayout}
		><svelte:component this={layoutManager.fullLeft.component} /></Box
	>
	{#if minimized === false}
		<Box
			className="fullRight"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.fullRight}
			><svelte:component this={layoutManager.fullRight.component} /></Box
		>
		<Box
			className="fullTop"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.fullTop}
			><svelte:component this={layoutManager.fullTop.component} /></Box
		>
		<Box
			className="fullBottom"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.fullBottom}
			><svelte:component this={layoutManager.fullBottom.component} /></Box
		>
		<Box
			className="topLeft"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.topLeft}
			><svelte:component this={layoutManager.topLeft.component} /></Box
		>
		<Box
			className="topRight"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.topRight}
			><svelte:component this={layoutManager.topRight.component} /></Box
		>
		<Box
			className="bottomRight"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.bottomRight}
			><svelte:component this={layoutManager.bottomRight.component} /></Box
		>
		<Box
			className="bottomLeft"
			figmaImportConfig={baseLayoutContainer}
			figmaImport={layoutConfig.bottomLeft.component}
			><svelte:component this={layoutManager.bottomLeft.component} /></Box
		>
		<svelte:component this={layoutManager.full.component} />
	{/if}
</Box>
