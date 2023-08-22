import screenSize from '../stores/screenSize.js';

function scrollBarWatcher() {
    setTimeout(() => {
        let root = document.documentElement;
        if (root.scrollWidth === root.clientWidth) {
            root.style.setProperty('--scrollBarHeight', '0');
        } else {
            root.style.setProperty('--scrollBarHeight', '0');
        }

        if (root.scrollHeight === root.clientHeight) {
            root.style.setProperty('--scrollBarWidth', '0');
        } else {
            root.style.setProperty('--scrollBarWidth', '0.5vh');
        }
    }, 10);
}

export default scrollBarWatcher;


