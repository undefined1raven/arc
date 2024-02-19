import timePadding from "../../fn/timePadding";


function getAverageTaskStartTime(filteredTasks, dataMembers) {
    let tasksStartUnixArrays = {};

    for (let ix = 0; ix < filteredTasks.length; ix++) {
        const task = filteredTasks[ix];
        const taskDayMidnightUnix = new Date(task.taskStartUnix).setHours(0, 0, 0, 0);
        let taskStartUnixArray = tasksStartUnixArrays[task.taskID];
        const taskStartDelta = task.taskStartUnix - taskDayMidnightUnix;
        const taskEndDelta = task.taskEndUnix - taskDayMidnightUnix;
        if (taskStartUnixArray === undefined) {
            tasksStartUnixArrays[task.taskID] = { startDelta: taskStartDelta, endDelta: taskEndDelta, count: 1 };
        } else {
            tasksStartUnixArrays[task.taskID] = { count: taskStartUnixArray.count + 1, startDelta: taskStartUnixArray.startDelta + taskStartDelta, endDelta: taskStartUnixArray.endDelta + taskEndDelta };
        }
    }

    function parseOutputUnixToDisplayFormat(unix) {
        const date = new Date(unix);
        return `${timePadding(date.getHours())}:${timePadding(date.getMinutes())}`;
    }

    let perTaskParsedAverages = {};
    const prevMidnight = new Date().setHours(0, 0, 0, 0);
    const tasksStartUnixArraysKeys = Object.keys(tasksStartUnixArrays);
    for (let ix = 0; ix < tasksStartUnixArraysKeys.length; ix++) {
        let taskStats = tasksStartUnixArrays[tasksStartUnixArraysKeys[ix]];
        const avgStartDeltaUnix = parseFloat((taskStats.startDelta / taskStats.count).toFixed(4));
        const avgEndDeltaUnix = parseFloat((taskStats.endDelta / taskStats.count).toFixed(4));
        perTaskParsedAverages[tasksStartUnixArraysKeys[ix]] = { avgTaskStart: parseOutputUnixToDisplayFormat(avgStartDeltaUnix + prevMidnight), avgTaskEnd: parseOutputUnixToDisplayFormat(avgEndDeltaUnix + prevMidnight) };
    }

    dataMembers.sort((a, b) => {
        return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });

    let syncedOut = []; ///sync with dataMembers to handle missing data and consistent ordering
    for (let ix = 0; ix < dataMembers.length; ix++) {
        const dataMemberID = dataMembers[ix].id;
        if (perTaskParsedAverages[dataMemberID] !== undefined) {
            syncedOut.push({ taskID: dataMemberID, ...perTaskParsedAverages[dataMemberID] });
        } else {
            syncedOut.push({ taskID: dataMemberID, avgTaskStart: NaN, avgTaskEnd: NaN });
        }
    }

    return syncedOut;
}

export { getAverageTaskStartTime };