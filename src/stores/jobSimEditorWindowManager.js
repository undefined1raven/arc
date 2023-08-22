import { writable } from "svelte/store"

const jobSimEditorWindowManager = writable({
    timelineEditor: {
        open: true, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft', 'full', 'topRight']
    },
    docsManager: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    jobSimApps: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    settings: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    help: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    }
});



export default jobSimEditorWindowManager;