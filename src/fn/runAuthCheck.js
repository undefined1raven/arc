import axios from "axios";
import domainGetter from "./domainGetter";

function runAuthCheck(authedRedirect, notAuthedRedirect) {//set false to not redirect anywhere
    if (window !== undefined) {
        let lauthedRedirect = '/profile';
        let lnotAuthedRedirect = '/login';
        if (authedRedirect !== undefined) {
            lauthedRedirect = authedRedirect;
        }
        if (notAuthedRedirect !== undefined) {
            lnotAuthedRedirect = notAuthedRedirect;
        }

        if (localStorage.getItem('authed') === 'true') {
            if (authedRedirect !== false) {
                window.location.href = lauthedRedirect;
            }
        } else {
            if (notAuthedRedirect !== false) {
                window.location.href = lnotAuthedRedirect;
            }
        }

        axios
            .get(domainGetter('/verify'), { withCredentials: true, headers: { pragma: 'no-cache' } })
            .then((res) => {
                const responseData = res.data;
                if (responseData.authed === true) {
                    localStorage.setItem('authed', 'true');
                    if (authedRedirect !== false) {
                        window.location.href = lauthedRedirect;
                    }
                } else if (notAuthedRedirect !== false) {
                    localStorage.setItem('authed', 'false');
                    localStorage.removeItem('fullName');
                    localStorage.removeItem('email');
                    localStorage.removeItem('verifiedEmail');
                    localStorage.removeItem('ud_fetch_unix');
                    window.location.href = lnotAuthedRedirect;
                }
            })
            .catch((e) => {
                localStorage.setItem('authed', 'false');
            });
    }
}

export default runAuthCheck;
