import symmetricDecrypt from "../../../fn/crypto/symmetricDecrypt";


async function processEncryptedSID(encryptedSIDs, encryptedStatusArray, key) {
    const decryptionArray = [];
    try {

        for (let ix = 0; ix < encryptedSIDs.length; ix++) {
            decryptionArray.push(symmetricDecrypt(encryptedSIDs[ix].cipher, key, encryptedSIDs[ix].iv));
        }
    } catch (e) {
        return { status: false, error: e }
    }
    let SIDs = [];
    await Promise.allSettled(decryptionArray).then(resArr => {
        for (let ix = 0; ix < resArr.length; ix++) {
            SIDs.push(JSON.parse(resArr[ix].value));
        }
    }).catch(e => {
        return { status: false, error: e }
    })
    let decryptedStatusArray = [];
    await symmetricDecrypt(encryptedStatusArray.cipher, key, encryptedStatusArray.iv).then(statusArr => {
        decryptedStatusArray = JSON.parse(statusArr);
    }).catch(e => {
        return { status: false, error: e }
    })
    return { statusArray: decryptedStatusArray, SIDs: SIDs, status: true }
}


export { processEncryptedSID }