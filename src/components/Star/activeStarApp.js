import { writable } from "svelte/store";



const activeStarApp = writable('menu'); //menu | messageArchive

export { activeStarApp };