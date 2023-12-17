import { fly } from "svelte/transition";

function getTransition(stage, delay) {
    let delayActual = 50;
    if (delay !== undefined && typeof (delay) === 'number') {
        delayActual = delay;
    }
    return {
        in: { func: fly, options: { delay: stage * delayActual, duration: 200, y: '-4%' } }
    };
}

function getDesktopTransition(stage, delay) {
    let delayActual = 50;
    if (delay !== undefined && typeof (delay) === 'number') {
        delayActual = delay;
    }
    return {
        in: { func: fly, options: { delay: stage * delayActual, duration: 200, y: '-10%' } }
    };
}

export { getTransition, getDesktopTransition }
