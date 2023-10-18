import { writable } from "svelte/store";

let windowHash = writable(window.location.hash);

setInterval(() => {
    windowHash.set(window.location.hash)
}, 100);

export default windowHash;