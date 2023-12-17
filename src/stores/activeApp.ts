import { writable, type Readable } from "svelte/store";

type ActiveApp = 'arc' | 'tess' | 'sid' | 'menu' | 'star';

const activeApp: Readable<ActiveApp> = writable('arc'); // arc | tess | sid | menu


export { activeApp };