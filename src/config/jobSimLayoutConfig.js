
function getJobSimLayoutConfig(minimized) {
    let layout = {
        baseLayout: {
            desktop: { top: minimized === false ? '12%' : '6%', left: '0.7%', width: '98.83%', height: minimized === false ? '86%' : '93%' }
        },
        fullLeft: {
            desktop: { top: '0%', left: '0%', height: '100%', width: '49%' }
        },
        fullRight: {
            desktop: { top: '0%', left: '50.7%', height: '100%', width: '49%' }
        },
        fullTop: {
            desktop: { top: '0%', left: '0%', height: '49.3%', width: '100%' }
        },
        fullBottom: {
            desktop: { top: '50.7%', left: '0%', height: '49.3%', width: '100%' }
        },
        full: {
            desktop: { top: '0%', left: '0%', height: '100%', width: '100%' }
        },
        topRight: {
            desktop: { top: '0%', left: 819, height: 473, width: 800 }
        },
        topLeft: { desktop: { top: '0%', left: '0%', height: 473, width: 800 } },
        bottomRight: { desktop: { top: 489, left: 819, height: 473, width: 800 } },
        bottomLeft: { desktop: { top: 489, left: '0%', height: 473, width: 800 } }
    };
    return layout;
}

export default getJobSimLayoutConfig;