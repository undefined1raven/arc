<script lang="ts">
	import { onMount } from 'svelte';
	import { getDynamicBorderRadius } from '../../fn/dynamicBorders';
	import Box from './Box.svelte';
	import getRandomInt from '../../fn/getRandomInt';

	let can;
	let x = true;
	let hueRotate = 180;
	let encryptedObjStr = '';
	String.prototype.hexEncode = function () {
		var hex, i;

		var result = '';
		for (i = 0; i < this.length; i++) {
			hex = this.charCodeAt(i).toString(16);
			result += ('000' + hex).slice(-4);
		}

		return result;
	};

	function hexToRgbA(hex) {
		var c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return (
				'rgba(' +
				[
					(c >> 24) & 255,
					(c >> 16) & 255,
					(c >> 8) & 255,
					Math.max(Math.random().toFixed(2), 1)
				].join(',') +
				')'
			);
		}
		throw new Error('Bad Hex');
	}
	onMount(() => {
		let y = setInterval(() => {
			hueRotate = getRandomInt(120, 150);
		}, 500);
		setTimeout(() => {
			let six = 0;
			let hexOut = [];
			let ws = encryptedObjStr.hexEncode();
			for (let ix = 0; ix < Math.floor(ws.length / 6); ix++) {
				let out = '#';
				for (let ixx = 0; ixx <= 6; ixx++) {
					out += ws[ix * 6 + ixx];
					if (out.length === 7) {
						hexOut.push(hexToRgbA(out));
					}
				}
			}
			const ctx = can.getContext('2d');
			let side = Math.sqrt(hexOut.length).toFixed(0);

			let cix = 0;
			for (let xc = 0; xc <= side; xc++) {
				for (let yc = 0; yc <= side; yc++) {
					ctx.fillStyle = hexOut[cix];
					ctx.fillRect(xc, yc, 1, 1);
					cix++;
				}
			}
		}, 20);
	});

	export { encryptedObjStr };
</script>

<Box
	figmaImport={{ mobile: { width: '100%', height: '70%', left: '50%', top: 30 } }}
	style="filter: hue-rotate({hueRotate}deg); transition: all linear 0.2s;"
	horizontalCenter={true}
>
	<canvas
		style="position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: #00000000; user-select: none;"
		width="100%"
		height="100%"
		bind:this={can}
	/>
</Box>
