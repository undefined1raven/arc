function isAuthed() {
    let authState = localStorage.getItem('authed');
    if (authState === null || authState === undefined || authState === 'false') {
        return false;
    } else if (authState === 'true') {
        return true;
    }
}


export default isAuthed;