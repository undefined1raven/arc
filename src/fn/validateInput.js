
function validateInput(keyArray, payloadObject) {
    if (keyArray === undefined || keyArray.length === 0) {
        return false;
    } else if (payloadObject === undefined) {
        return false;
    } else {
        let missingArgsList = '';
        let missingArgsCount = 0;
        for (let ix = 0; ix < keyArray.length; ix++) {
            if (payloadObject[keyArray[ix]] === undefined) {
                missingArgsList += `Property "${keyArray[ix]}" expected. `;
                missingArgsCount++;
            }
        }
        if (missingArgsCount > 0) {
            return false;
        } else if (missingArgsCount === 0) {
            return true;
        }
    }
}

export { validateInput };