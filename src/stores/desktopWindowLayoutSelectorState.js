import { writable } from "svelte/store";

const desktopWindowLayoutSelector = writable({ show: false, windowID: '', windowManagerSourceID: '' });

export default desktopWindowLayoutSelector;