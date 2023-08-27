import { writable } from "svelte/store";

export let dayViewSelectedDay = writable({});

export let categories = writable([{ active: true, id: 'null', name: 'None' }, { active: true, id: '0', name: 'A' }, { active: true, id: '1', name: 'B' }, { active: true, id: '2', name: 'C' }, { active: true, id: '3', name: 'D' }]);

export let tasksLog = writable([
    { taskID: '0', taskStartUnix: new Date('08-23-2023 01:15').getTime(), taskEndUnix: new Date('08-23-2023 10:15').getTime() },
    { taskID: '1', taskStartUnix: new Date('08-23-2023 08:15').getTime(), taskEndUnix: new Date('08-23-2023 10:15').getTime() },
    { taskID: '2', taskStartUnix: new Date('08-23-2023 08:15').getTime(), taskEndUnix: new Date('08-23-2023 13:15').getTime() },
    { taskID: '3', taskStartUnix: new Date('08-23-2023 08:15').getTime(), taskEndUnix: new Date('08-23-2023 14:15').getTime() },

    { taskID: '0', taskStartUnix: new Date('08-24-2023 08:15').getTime(), taskEndUnix: new Date('08-24-2023 09:15').getTime() },
    { taskID: '0', taskStartUnix: new Date('08-24-2023 10:15').getTime(), taskEndUnix: new Date('08-24-2023 11:15').getTime() },
    { taskID: '0', taskStartUnix: new Date('08-24-2023 11:15').getTime(), taskEndUnix: new Date('08-24-2023 12:15').getTime() },
    { taskID: '0', taskStartUnix: new Date('08-24-2023 14:15').getTime(), taskEndUnix: new Date('08-24-2023 15:15').getTime() },
    { taskID: '1', taskStartUnix: new Date('08-24-2023 16:15').getTime(), taskEndUnix: new Date('08-24-2023 17:15').getTime() },
    { taskID: '2', taskStartUnix: new Date('08-24-2023 18:15').getTime(), taskEndUnix: new Date('08-24-2023 19:15').getTime() },

    { taskID: '3', taskStartUnix: new Date('08-25-2023 04:18').getTime(), taskEndUnix: new Date('08-25-2023 05:15').getTime() },
    { taskID: '4', taskStartUnix: new Date('08-25-2023 08:15').getTime(), taskEndUnix: new Date('08-25-2023 10:15').getTime() },
    { taskID: '5', taskStartUnix: new Date('08-25-2023 14:15').getTime(), taskEndUnix: new Date('08-25-2023 15:15').getTime() },
    { taskID: '3', taskStartUnix: new Date('08-25-2023 15:30').getTime(), taskEndUnix: new Date('08-25-2023 16:15').getTime() },
    { taskID: '3', taskStartUnix: new Date('08-25-2023 17:11').getTime(), taskEndUnix: new Date('08-25-2023 18:15').getTime() },

    { taskID: '4', taskStartUnix: new Date('08-26-2023 06:41').getTime(), taskEndUnix: new Date('08-26-2023 06:51').getTime() },
    { taskID: '5', taskStartUnix: new Date('08-26-2023 09:10').getTime(), taskEndUnix: new Date('08-26-2023 10:51').getTime() },
    { taskID: '3', taskStartUnix: new Date('08-26-2023 11:00').getTime(), taskEndUnix: new Date('08-26-2023 12:51').getTime() },
    { taskID: '4', taskStartUnix: new Date('08-26-2023 12:15').getTime(), taskEndUnix: new Date('08-26-2023 15:51').getTime() },
    { taskID: '4', taskStartUnix: new Date('08-26-2023 12:15').getTime(), taskEndUnix: new Date('08-26-2023 15:51').getTime() },
    { taskID: '4', taskStartUnix: new Date('08-26-2023 12:15').getTime(), taskEndUnix: new Date('08-26-2023 15:51').getTime() },

    { taskID: '4', taskStartUnix: new Date('08-27-2023 12:15').getTime(), taskEndUnix: new Date('08-27-2023 15:51').getTime() },
    { taskID: '4', taskStartUnix: new Date('08-27-2023 12:15').getTime(), taskEndUnix: new Date('08-27-2023 15:51').getTime() },
    { taskID: '5', taskStartUnix: new Date('08-27-2023 01:15').getTime(), taskEndUnix: new Date('08-27-2023 02:00').getTime() }]);

export let tasks = writable([
    { active: true, id: '0', expectedStart: '14:25', expectedEnd: '14:55', name: 'Tasky1', categoryID: '0' },
    { active: true, id: '1', name: 'Tasky2', categoryID: '1', isRoutine: true, expectedStart: '14:25', expectedEnd: '14:55' },
    { active: true, id: '2', name: 'Tasky3', categoryID: '2', isRoutine: false, expectedStart: '14:25', expectedEnd: '14:55' },
    { active: true, id: '3', name: 'Tasky4', categoryID: '3', isRoutine: true, expectedStart: '14:25', expectedEnd: '14:55' },
    { active: true, id: '4', name: 'Tasky5', categoryID: '3', isRoutine: false, expectedStart: '14:25', expectedEnd: '14:55' },
    { active: true, id: '5', name: 'Tasky6', categoryID: '2', isRoutine: false, expectedStart: '14:25', expectedEnd: '14:55' }]);

export let days = writable([
    { dayStartUnix: new Date('08-23-2023').getTime(), dayEndUnix: new Date('08-24-2023').getTime() - 1, routine: true, status: 'success', coverage: '87%' },
    { dayStartUnix: new Date('08-24-2023').getTime(), dayEndUnix: new Date('08-25-2023').getTime() - 1, routine: true, status: 'success', coverage: '88%' },
    { dayStartUnix: new Date('08-25-2023').getTime(), dayEndUnix: new Date('08-26-2023').getTime() - 1, routine: true, status: 'success', coverage: '89%' },
    { dayStartUnix: new Date('08-26-2023').getTime(), dayEndUnix: new Date('08-27-2023').getTime() - 1, routine: false, status: 'fail', coverage: '89%' },
]);
