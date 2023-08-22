import { writable } from "svelte/store";

const toolTipState = writable({ text: '', show: false });

export default toolTipState;