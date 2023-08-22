import { writable } from "svelte/store"

const root = document.documentElement;
const displaySize = { width: window.screen.width, height: window.screen.height };
const isMinimizedThreshold = (54 / 100) * displaySize.width;//% of screen width

const screenSize = writable({ width: root.clientWidth, height: root.clientHeight, minimized: root.clientWidth < isMinimizedThreshold });

export default screenSize;