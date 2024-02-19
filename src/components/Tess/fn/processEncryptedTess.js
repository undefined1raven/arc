import symmetricDecrypt from "../../../fn/crypto/symmetricDecrypt";

async function processEncryptedTess(logs, currentDay, exfArray, statusArray, priorityArray, projects, key) {
    let decryptionPromiseArray = [];

    decryptionPromiseArray.push(symmetricDecrypt(currentDay.cipher, key, currentDay.iv));
    decryptionPromiseArray.push(symmetricDecrypt(exfArray.cipher, key, exfArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(statusArray.cipher, key, statusArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(priorityArray.cipher, key, priorityArray.iv));
    decryptionPromiseArray.push(symmetricDecrypt(projects.cipher, key, projects.iv));

    return await Promise.allSettled(decryptionPromiseArray).then(arr => {
        if (arr.find(elm => elm.status === 'rejected') === undefined) {
            const encryptedLogChunks = logs;
            let chunkDecryptionPromises = [];
            let decryptedLogs = [];
            for (let ix = 0; ix < encryptedLogChunks.length; ix++) {
                const chunk = JSON.parse(encryptedLogChunks[ix]);
                chunkDecryptionPromises.push(symmetricDecrypt(chunk.cipher, key, chunk.iv));
            }
            Promise.allSettled(chunkDecryptionPromises).then(arrx => {
                for (let ix = 0; ix < arrx.length; ix++) {
                    if (arrx[ix].status === 'fulfilled') {
                        const decryptedChunk = JSON.parse(arrx[ix].value);
                        for (let ix = 0; ix < decryptedChunk.length; ix++) {
                            decryptedLogs.push(decryptedChunk[ix]);
                        }
                    } else {
                        console.log(ix, 'e')
                        return { status: false, error: `Chunk Decryption Failed [index: ${ix}]`, details: JSON.stringify(arrx) }
                    }
                }
            }).catch(e => {
                console.log(e)
                return { status: false, error: e }
            })
            return {
                status: true,
                results: {
                    logs: decryptedLogs,
                    currentDay: JSON.parse(arr[0].value),
                    exfArray: JSON.parse(arr[1].value),
                    statusArray: JSON.parse(arr[2].value),
                    priorityArray: JSON.parse(arr[3].value),
                    projects: JSON.parse(arr[4].value),
                }
            }
        } else {
            console.log('unk')
            return { status: false, error: 'unk' }
        }
    }).catch(e => {
        console.log(e)
        return { status: false, error: e }
    })
}


export { processEncryptedTess }