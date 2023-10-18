import isAuthed from "./isAuthed";
import axios from "axios";
import domainGetter from "./domainGetter";

function menuDynamicLogOutButtonConfig() {
    if (isAuthed() === true) {
        return {
            label: 'Log Out',
            onClick: () => {
                axios
                    .get(domainGetter('/logout'), { withCredentials: true })
                    .then(() => {
                        localStorage.setItem('authed', 'false');
                        window.location.href = '/';
                        localStorage.removeItem('fullName');
                        localStorage.removeItem('email');
                        localStorage.removeItem('verifiedEmail');
                        localStorage.removeItem('ud_fetch_unix');
                    })
                    .catch((e) => { });
            }
        }
    } else {
        return {
            label: 'Log In',
            path: '/login',
        }
    }
}

export default menuDynamicLogOutButtonConfig;