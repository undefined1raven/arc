export default {
    title: '',
    height: '100%',
    grid: {
        x: {
            enabled: false
        },
        y: {
            enabled: false
        }
    },
    axes: {
        bottom: {
            visible: false,
            mapsTo: 'date',
            scaleType: 'time'
        },
        left: {
            visible: false,
            mapsTo: 'value',
            scaleType: 'linear'
        }
    },
    color: {
        scale: {
            "none": "#00000000",
        }
    },
    points: {
        enabled: false
    },
    legend: {
        enabled: false,
    }
}

/**
 color: {
     scale: {
         "Work": '#2400ff',
         "R&R": '#8800aa',
     },
 },
*/
