import { writable } from "svelte/store";

const userDataCache = writable({ fullName: 'null', email: 'null', verifiedEmail: 'null', ud_fetch_unix: 'null' });

export default userDataCache;