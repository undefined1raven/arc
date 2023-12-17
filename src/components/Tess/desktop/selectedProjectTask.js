import { writable } from "svelte/store";


const selectedProjectTask = writable({
    id: 'TID-3',
    name: 'Design PCBs',
    taskRef: 'TRF-331',
    description: 'ilyyy',
    startUnix: Date.now(),
    endUnix: 0,
    deadline: Date.now(),
    statusID: 'STID-2',
    ini: false,
    ix: -1
});


export { selectedProjectTask }