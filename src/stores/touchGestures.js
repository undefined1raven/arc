import { writable } from 'svelte/store';

const touchStart = writable([{ x: 0, y: 0 }]);
const touchMove = writable([{ x: 0, y: 0 }]);
const touchEnd = writable([{ x: 0, y: 0 }]);

export { touchStart, touchMove, touchEnd };