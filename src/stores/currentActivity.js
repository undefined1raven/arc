import { writable } from "svelte/store";

const currentActivityCache = localStorage.getItem('currentActivity');
let parsedCurrentActivity = null;
try {
    parsedCurrentActivity = JSON.parse(currentActivityCache);
} catch (e) {
    parsedCurrentActivity = null;
}

export let currentActivity = writable(parsedCurrentActivity);

currentActivity.subscribe((value) => {
    if (value !== null) localStorage.setItem('currentActivity', JSON.stringify(value));
});