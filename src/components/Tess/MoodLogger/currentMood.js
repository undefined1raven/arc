import { writable } from "svelte/store";

const currentMood = writable(null);

currentMood.subscribe(cm => {
    if (cm !== null) {
        localStorage.setItem('activeMood', JSON.stringify(cm));
    }
})
export { currentMood };