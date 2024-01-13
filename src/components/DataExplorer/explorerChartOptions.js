const donutBaseOptions = {
    "title": "Donut",
    "resizable": true,
    "donut": {
        "center": {
            "label": "Browsers"
        }
    },
    "height": "400px"
};

const horizontalFloatingBarBaseOptions = {
	"title": "Day Timeline",
	"axes": {
		"left": {
			"mapsTo": "value",
			"scaleType": "linear"			
		},
		"bottom": {
            "mapsTo": "date",
			"scaleType": "time"
		}
	},
};

const horizontalStackedBarBaseOptions = {
	"title": "Day Timeline",
	"axes": {
		"left": {
			"scaleType": "labels"
		},
		"bottom": {
			"stacked": true
		}
	},
};

export { donutBaseOptions, horizontalFloatingBarBaseOptions, horizontalStackedBarBaseOptions };
