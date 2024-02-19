onmessage = (e) => {
    try {
        const parsedData = JSON.parse(e.data);
        const logs = parsedData.logs;
        let taskNames = [];
        for (let ix = 0; ix < logs.length; ix++) {
            const dayLog = logs[ix];
            for (let iix = 0; iix < dayLog.tasks.length; iix++) {
                const task = dayLog.tasks[iix];
                if (taskNames.find((elm) => elm === task.name) === undefined) {
                    taskNames.push(task.name);
                }
            }
        }
        postMessage({ status: 'success', result: taskNames });
    } catch (e) {
        postMessage({ status: 'failed', error: e });
    }
};