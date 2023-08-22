import { writable } from "svelte/store"

const windowManager = writable({
    calendar: { open: false, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } },
    docs: { open: true, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } },
    email: { open: true, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } },
    teamComms: { open: true, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } },
    settings: { open: false, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } },
    dashboard: { open: false, minimized: false, size: { width: 0, height: 0 }, location: { top: 0, left: 0 } }
});

export default windowManager;