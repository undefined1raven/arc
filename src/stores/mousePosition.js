import { writable } from "svelte/store";

let mousePosition = writable({ x: 0, y: 0 });

export default mousePosition;