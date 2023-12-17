onmessage = (e) => {
    try {
        const parsedData = JSON.parse(e.data);
        window.dcodeIO.bcrypt.compare(parsedData.password, parsedData.hash).then(res => {
            postMessage({ status: 'success', result: res });
        }).catch(e => {
            postMessage({ status: 'failed', error: e });
        })
    } catch (e) {
        postMessage({ status: 'failed', error: e });
    }
};