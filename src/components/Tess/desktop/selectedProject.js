import { writable } from "svelte/store";


const selectedProject = writable({
    PID: 'PI3Xx_4242',
    objective: '',
    startUnix: Date.now(),
    tasks: [],
    priorityID: 'PIX-1',
    description: '',
    logs: [],
    name: 'Nax',
    statusID: 'STID-1',
    ini: false,
    ix: -1
});


export { selectedProject }