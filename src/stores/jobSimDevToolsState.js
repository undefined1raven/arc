import { writable } from "svelte/store";
import emilyBaseSysPrompt from "../config/emilyBaseSystemPrompt";
var emilyPrompt = emilyBaseSysPrompt;

let jobSimDevToolsState = writable({ replyRequestStatus: 'waiting', systemPrompt: emilyPrompt, total_tokens: 0, saveToDB: false });

export default jobSimDevToolsState;