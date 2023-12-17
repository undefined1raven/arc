import symmetricDecrypt from "../../../fn/crypto/symmetricDecrypt";

async function processEncryptedTess(logs, currentDay, exfArray, statusArray, priorityArray, projects, key) {
    let decryptionPromiseArray = [];

    decryptionPromiseArray.push(symmetricDecrypt(logs.cipher, key, logs.iv));
    decryptionPromiseArray.push(symmetricDecrypt(currentDay.cipher, key, currentDay.iv));
    decryptionPromiseArray.push(symmetricDecrypt(exfArray.cipher, key, exfArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(statusArray.cipher, key, statusArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(priorityArray.cipher, key, priorityArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(projects.cipher, key, projects.iv));

    return await Promise.allSettled(decryptionPromiseArray).then(arr => {
        if (arr.find(elm => elm.status === 'rejected') === undefined) {
            return {
                status: true,
                results: {
                    logs: JSON.parse(arr[0].value),
                    currentDay: JSON.parse(arr[1].value),
                    exfArray: JSON.parse(arr[2].value),
                    statusArray: JSON.parse(arr[3].value),
                    priorityArray: JSON.parse(arr[4].value),
                    projects: JSON.parse(arr[5].value),
                }
            }
        } else {
            return { status: false, error: 'unk' }
        }
    }).catch(e => {
        return { status: false, error: e }
    })
}


export { processEncryptedTess }