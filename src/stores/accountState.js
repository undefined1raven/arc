import { writable } from "svelte/store";


export const accountState = writable({ hexbotConfig: false, ini: false });