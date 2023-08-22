import { writable } from "svelte/store"

const defaultWindowManagerStateObject = {
    calendar: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    teamComms: {
        open: true, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    docs: {
        open: false, screenDock: 'fullRight',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    email: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    settings: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    dashboard: {
        open: false, screenDock: 'fullLeft',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    timeline: {
        open: true, screenDock: 'fullRight',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    devTools: {
        open: false, screenDock: 'fullRight',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    },
    codeReview: {
        open: false, screenDock: 'full',
        compatibleScreenDocks: ['fullRight', 'fullLeft', 'full']
    },
    bugReport: {
        open: false, screenDock: 'fullRight',
        compatibleScreenDocks: ['fullRight', 'fullLeft']
    }
};

const windowManager = writable(defaultWindowManagerStateObject);

const windowManagerBuffer = writable(defaultWindowManagerStateObject);

export { windowManager, windowManagerBuffer, defaultWindowManagerStateObject };