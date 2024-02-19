import domainGetter from "./domainGetter";

function logout() {
    localStorage.clear();
    window.location.href = '/login';
}


export default logout