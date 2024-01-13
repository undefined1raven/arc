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

export { donutBaseOptions, horizontalFloatingBarBaseOptions };
