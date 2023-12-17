import { writable } from "svelte/store";

const activeTessApp = writable('menu');

export { activeTessApp }