import domainGetter from "./domainGetter";
import axios from "axios";

function logout() {
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


export default logout