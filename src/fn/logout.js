import domainGetter from "./domainGetter";

function logout() {
    localStorage.removeItem('privateKey');
    localStorage.removeItem('accountID');
    localStorage.removeItem('simkey');
    localStorage.removeItem('tess_simkey');
    localStorage.removeItem('at');
    window.location.href = '/login';

}


export default logout