import devToolsState from '../stores/jobSimDevToolsState.js';
function updateDevToolsState(key, value) {
    devToolsState.update((prev) => {
        if (prev[key] === undefined) return prev;
        prev[key] = value;
        return prev;
    });
}

export default updateDevToolsState;