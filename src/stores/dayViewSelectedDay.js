import { writable } from "svelte/store";
import encrypt from "../fn/crypto/encrypt";
import { importPrivateKey } from "../fn/crypto/keyOps";
import decrypt from "../fn/crypto/decrypt";
import getRandomInt from "../fn/getRandomInt";

export let dayViewSelectedDay = writable({});//not in db - this is dynamically generated depending on what day the user clicks on

//prod
export let categories = writable([{ active: true, id: 'null', name: 'None' }, { active: true, id: 'CAT-0', name: 'Workout' }, { active: true, id: 'CAT-1', name: 'Academics' }, { active: true, id: 'CAT-2', name: 'Bio' }]); //, { active: true, id: '3', name: 'Biox' }
export let tasks = writable([
    { active: true, id: 'TASK-0', name: 'School/Uni', categoryID: 'CAT-1', isRoutine: false, expectedStart: '12:00', expectedEnd: '17:55' },
    { active: true, id: 'TASK-1', name: 'Morning Run', categoryID: 'CAT-0', isRoutine: false, expectedStart: '06:00', expectedEnd: '08:00' },
]);
export let tasksLog = writable([]);
const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
export let days = writable([
    { status: 'upcoming', routine: true, coverage: '1%', dayStartUnix: new Date(dateStr).getTime() - 86400000, dayEndUnix: new Date(dateStr).getTime() - 1, },
]);
export let imported = writable(false);



//dev
// export let categories = writable([{ active: true, id: 'null', name: 'None' }, { active: true, id: 'CAT-0', name: 'Workout' }, { active: true, id: 'CAT-1', name: 'Academics' }, { active: true, id: 'CAT-2', name: 'Bio' }, { active: true, id: 'CAT-3', name: 'Biox' }]); //, { active: true, id: '3', name: 'Biox' }

// export let tasks = writable([
//     { active: true, id: 'TASK-0', name: 'School/Uni', categoryID: 'CAT-0', isRoutine: false, expectedStart: '12:00', expectedEnd: '17:55' },
//     { active: true, id: 'TASK-1', name: 'Morning Run', categoryID: 'CAT-0', isRoutine: false, expectedStart: '06:00', expectedEnd: '08:00' },
//     { active: true, id: 'TASK-3', name: 'Morning Rxxun', categoryID: 'CAT-0', isRoutine: false, expectedStart: '06:00', expectedEnd: '08:00' },
//     { active: true, id: 'TASK-2', name: 'Morndding Rxxun', categoryID: 'CAT-0', isRoutine: false, expectedStart: '06:00', expectedEnd: '08:00' },
// ]);


// export let tasksLog = writable([
//     { taskID: 'TASK-3', taskStartUnix: new Date('07-04-2023').getTime(), taskEndUnix: new Date('07-04-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('07-04-2023').getTime(), taskEndUnix: new Date('07-04-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('07-04-2023').getTime(), taskEndUnix: new Date('07-04-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('07-04-2023').getTime(), taskEndUnix: new Date('07-04-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('07-04-2023').getTime(), taskEndUnix: new Date('07-04-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-12-2023').getTime(), taskEndUnix: new Date('08-12-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-2', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-13-2023').getTime(), taskEndUnix: new Date('08-13-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-2', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-2', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-14-2023').getTime(), taskEndUnix: new Date('08-14-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-16-2023').getTime(), taskEndUnix: new Date('08-16-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-2', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-2', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-17-2023').getTime(), taskEndUnix: new Date('08-17-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-18-2023').getTime(), taskEndUnix: new Date('08-18-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-3', taskStartUnix: new Date('08-20-2023').getTime(), taskEndUnix: new Date('08-20-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-21-2023').getTime(), taskEndUnix: new Date('08-21-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-0', taskStartUnix: new Date('08-21-2023').getTime(), taskEndUnix: new Date('08-21-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },
//     { taskID: 'TASK-1', taskStartUnix: new Date('08-21-2023').getTime(), taskEndUnix: new Date('08-21-2023').getTime() + 1000 * 60 * 60 * getRandomInt(1, 340) },

// ]);
