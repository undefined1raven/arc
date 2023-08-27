import { writable } from "svelte/store";


export let currentActivity = writable(null);

currentActivity.subscribe((value) => {
    if (value !== null) localStorage.setItem('currentActivity', JSON.stringify(value));
});