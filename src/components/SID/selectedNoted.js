import { writable } from "svelte/store";
import globalStyle from "../../stores/globalStyles";
import { v4 } from 'uuid'
import { appColors } from "../../config/appColors";

const selectedNote = writable({ NID: 'none', tx: 0, content: '', name: '', color: appColors.sid.activeColor });

export { selectedNote }
