import { priorityArray, projects } from "../components/Tess/TessVault";
import { chunkArray } from "./chunkArray";
import { importSymmetricKey, str2ab, unwrapKey } from "./crypto/keyOps";
import symmetricDecrypt from "./crypto/symmetricDecrypt";
import symmetricEncrypt from "./crypto/symmetricEncrypt";


function handleEncryptionError(e) {
    return { status: false, error: e }
}


/**
 * 
 * @param logs logs 
 * @param currentDay currentDay 
 * @param exfArray exfArray
 * @param statusArray statusArray
 * @param vaultPIN vaultPIN
 * @param boolean updateCache
 * @returns Object {status: true|false, uplinkDoc: uplinkDoc(if successful) else error: e}
 */
async function getTessUplinkDoc(logs, currentDay, exfArray, statusArray, priorityArray, projects, moodArray, vaultPIN, updateCache) {
    let tess_simkey = localStorage.getItem('tess_simkey');

    const chunkedLogs = chunkArray(15, logs);
    try {
        const parsedTessSimkey = JSON.parse(tess_simkey);
        if (parsedTessSimkey.key !== undefined && parsedTessSimkey.iv !== undefined && parsedTessSimkey.salt !== undefined) {
            return unwrapKey(str2ab(parsedTessSimkey.key), vaultPIN, str2ab(parsedTessSimkey.salt), str2ab(parsedTessSimkey.iv)).then(key => {
                let encryptionPromises = [];
                let encryptedLogChunks = [];
                for (let ix = 0; ix < chunkedLogs.length; ix++) {
                    encryptionPromises.push(symmetricEncrypt(JSON.stringify(chunkedLogs[ix]), key));
                }

                Promise.allSettled(encryptionPromises).then(arr => {
                    for (let ix = 0; ix < arr.length; ix++) {
                        if (arr[ix].status === 'fulfilled') {
                            const encryptedChunk = arr[ix].value;
                            encryptedLogChunks.push(JSON.stringify(encryptedChunk))
                        } else {
                            return { status: false, error: `One or more logs chunks failed to encrypt. Chunk index: ${ix}`, details: JSON.stringify(arr) }
                        }
                    }
                }).catch(e => {
                    return { status: false, error: e }
                })

                let exportPromiseArray = [];
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(currentDay), key));
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(exfArray), key));
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(statusArray), key));
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(priorityArray), key));
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(projects), key));
                exportPromiseArray.push(symmetricEncrypt(JSON.stringify(moodArray), key));
                return Promise.allSettled(exportPromiseArray).then(arr => {
                    if (arr.find(elm => elm.status === 'rejected') === undefined) {
                        if (updateCache === true) {
                            const currentCache = localStorage.getItem('encryptedOfflineCache');
                            let updateFragment = {
                                tess:
                                {
                                    logs: encryptedLogChunks,
                                    currentDay: arr[0].value,
                                    exfArray: arr[1].value,
                                    statusArray: arr[2].value,
                                    priorityArray: arr[3].value,
                                    projects: arr[4].value,
                                    moodArray: arr[5].value,
                                }
                            };
                            if (currentCache === null) {
                                localStorage.setItem('encryptedOfflineCache', JSON.stringify({ ...updateFragment, tx: Date.now() }));
                            } else {
                                try {
                                    const parsedCurrentCache = JSON.parse(currentCache);
                                    localStorage.setItem('encryptedOfflineCache', JSON.stringify({ ...parsedCurrentCache, ...updateFragment, tx: Date.now() }))
                                } catch (e) { }
                            }
                        }
                        return {
                            status: true, uplinkDoc: {
                                tess:
                                {
                                    logs: encryptedLogChunks,
                                    currentDay: arr[0].value,
                                    exfArray: arr[1].value,
                                    statusArray: arr[2].value,
                                    priorityArray: arr[3].value,
                                    projects: arr[4].value,
                                    moodArray: arr[5].value,
                                },
                                tx: Date.now()
                            }
                        }
                    } else {
                        return { status: false, error: 'something bad happened', details: JSON.stringify(arr) }
                    }
                }).catch(e => {
                    return { status: false, error: e }
                })
            })
        } else {
            return { status: false, error: 'Invalid TESSSIMKEY' }
        }
    } catch (e) {
        console.log(e)
        return { status: false, error: e }
    }
}


export { getTessUplinkDoc }