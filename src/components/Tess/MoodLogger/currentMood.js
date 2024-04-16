import { writable } from "svelte/store";

const currentMood = writable(null);

export { currentMood };