function getAccountKeyPayload() {
    return JSON.stringify({
        pk: localStorage.getItem('privateKey'),
        simkey: localStorage.getItem('simkey'),
        id: localStorage.getItem('accountID'),
        tess_simkey: localStorage.getItem('tess_simkey')
    })
}

export { getAccountKeyPayload }