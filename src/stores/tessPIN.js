import { writable } from "svelte/store";

const tessPIN = writable({ pin: 'none', tx: 0, ini: false });

export { tessPIN };

