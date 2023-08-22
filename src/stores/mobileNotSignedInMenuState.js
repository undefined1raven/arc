import { writable } from "svelte/store";


const notSignedInMenuState = writable({ visible: false, opacity: 1 });

export default notSignedInMenuState;

