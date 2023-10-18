function getOptions(colorsObject) {
    return {
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
                scale: {
                    color: '#000000'
                },
                visible: true,
                mapsTo: 'value',
                scaleType: 'linear'
            }
        },
        color: {
            scale: {
                ...colorsObject
            }
        },
        points: {
            enabled: false
        },
        legend: {
            enabled: false
        }
    };

}

export default getOptions;