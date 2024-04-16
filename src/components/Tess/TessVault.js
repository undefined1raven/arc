import { writable } from "svelte/store";

const logs = writable([]);

const currentDay = writable({
    tasks: [],
    exfArray: [],
    tx: 0,
    active: false,
    L5s: {
        L0: { x: 0, y: 0, color: '#959595' },
        L1: { x: 0, y: 0, color: '#608DFF' },
        L2: { x: 0, y: 0, color: '#1400FF' },
        L3: { x: 0, y: 0, color: '#712EFF' },
        L4: { x: 0, y: 0, color: '#BD00FF' },
        none: { x: 0, y: 0 }
    },
    moodLogs: []
});

const exfArray = writable([
    { EXFID: 'EXFID-1', event: 'Oversleeping', score: -300, show: true },
    { EXFID: 'EXFID-2', event: 'Completing All Tasks', score: 500, show: true },
    { EXFID: 'EXFID-3', event: 'Overeating', score: -200, show: true },
]);

const statusArray = writable([
    { id: 'STID-1', color: '#92B1FF', name: 'To Do', show: true },
    { id: 'STID-2', color: '#0049FF', name: 'Pending', show: true },
    { id: 'STID-3', color: '#FF023F', name: 'Canceled', show: true },
    { id: 'STID-4', color: '#00FF75', name: 'Completed', show: true },
]);

const projects = writable([]);

const priorityArray = writable([
    { name: 'L3', color: '#2400ff', show: true, id: 'PIX-1' },
    { name: 'L2', color: '#2400ff', show: true, id: 'PIX-2' },
    { name: 'L1', color: '#2400ff', show: true, id: 'PIX-3' },
    { name: 'L0', color: '#2400ff', show: true, id: 'PIX-4' }]);


const moodsArray = writable([
    { title: 'Stable High', color: '#00FF75', score: 70, id: 'MD-0' },
    { title: 'High Burst', color: '#0094FF', score: 10, id: 'MD-2' },
    { title: 'Low', color: '#CD5057', score: -50, id: 'MD-1' },
    { title: 'Bottom Low', color: '#7D0F15', score: -80, id: 'MD-4' },
    { title: 'ECOR', color: '#2515DE', score: -100, id: 'MD-3' },
    { title: 'Neutral', color: '#759A86', score: 0, id: 'MD-5' },
]);

const isTessImported = writable(false);

const selectedDayObj = writable({ tasks: [], exfArray: [], ini: false, ix: -1 });

export { logs, statusArray, exfArray, currentDay, isTessImported, selectedDayObj, priorityArray, projects, moodsArray }