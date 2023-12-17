import { writable } from "svelte/store";

const starPassword = writable('');
const starAccess = writable(false);

export { starPassword, starAccess }