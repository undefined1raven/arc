import { writable } from "svelte/store";

export let allowUpdates = writable(false);//allow updates to the db