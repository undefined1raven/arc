import { writable } from "svelte/store";

const activeTessApp = writable('menu');
const showDayHeader = writable(true);

export { activeTessApp, showDayHeader }