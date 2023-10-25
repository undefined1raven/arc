import { writable } from "svelte/store";


const keysStatus = writable(-1); // -1 == checking || 0 == error || 1 == ok

export { keysStatus };