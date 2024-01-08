import { writable } from "svelte/store";

const weekMillis = 1000 * 60 * 60 * 24 * 7;
const dataExplorerParams = writable({ timeframe: { startUnix: Date.now() - 0, endUnix: Date.now(), preset: 'lastWeek' }, selectedTaskIDs: [] });

export { dataExplorerParams }