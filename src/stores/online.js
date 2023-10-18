import { writable } from "svelte/store";

const isOnline = writable(-1); /// -1 === unknown || -2 == faulty sync || 0 == offline || 1 == online 

export { isOnline };