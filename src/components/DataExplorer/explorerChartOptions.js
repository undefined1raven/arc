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

const ex7heatmapOptions = {
	"title": "Heatmap",
	"axes": {
		"left": {
			"title": "",
			"mapsTo": "day",
			"scaleType": "labels"
		},
		"bottom": {
			"title": "",
			"mapsTo": "month",
			"scaleType": "labels"
		}
	},
	"heatmap": {
		"colorLegend": {
			"title": "",
			"type": 'quantize',
		},
	},
	"experimental": true,
	"width": '90%'
};

export { donutBaseOptions, horizontalFloatingBarBaseOptions, horizontalStackedBarBaseOptions, ex7heatmapOptions };
