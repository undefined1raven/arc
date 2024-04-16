import { writable } from "svelte/store";


const selectedMoodToEdit = writable({ title: '', id: '', color: '', score: 0 });

export { selectedMoodToEdit }