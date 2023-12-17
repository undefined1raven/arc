import { writable } from "svelte/store";


const starSelectedArchive = writable('');
const starSelectedArchiveDisplayName = writable('');


export { starSelectedArchive, starSelectedArchiveDisplayName }