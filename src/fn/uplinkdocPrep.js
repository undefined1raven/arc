import { importSymmetricKey } from "./crypto/keyOps";
import symmetricEncrypt from "./crypto/symmetricEncrypt";


function handleEncryptionError(e) {
    return { status: false, error: e }
}


/**
 * 
 * @param CategoriesStoreValue categories 
 * @param TasksStoreValue tasks 
 * @param TasksLogStoreValue tasksLog 
 * @param DaysStoreValue days 
 * @param boolean updateCache
 * @returns Object {status: true|false, uplinkDoc: uplinkDoc(if successful) else error: e}
 */
async function getUplinkDoc(categories, tasks, tasksLog, days, updateCache) {
    return importSymmetricKey(JSON.parse(localStorage.getItem('simkey')))
        .then(async (simkey) => {
            const chunkSize = 500;
            const chunkNumber = Math.ceil(tasksLog.length / chunkSize);

            let chunkedTasksLog = [];

            for (let ix = 1; ix <= chunkNumber; ix++) {
                chunkedTasksLog.push([]);
            }

            for (let ix = 0; ix < tasksLog.length; ix++) {
                const chunkIndex = Math.floor(ix / chunkSize);
                chunkedTasksLog[chunkIndex].push(tasksLog[ix]);
            }

            let encryptionPromises = [];

            for (let ix = 0; ix < chunkedTasksLog.length; ix++) {
                encryptionPromises.push(symmetricEncrypt(JSON.stringify(chunkedTasksLog[ix]), simkey));
            }

            let encryptedChunkedTasksLog = [];

            Promise.allSettled(encryptionPromises).then(results => {
                results.forEach(encryptedChunk => {
                    if (encryptedChunk.status === 'fulfilled') {
                        encryptedChunkedTasksLog.push(encryptedChunk.value);
                    }
                })
            }).catch((e) => {
                handleEncryptionError(e);
            });

            let uplinkDoc = {};
            await symmetricEncrypt(JSON.stringify(categories), simkey)
                .then((result) => {
                    uplinkDoc['categories'] = { cipher: result.cipher, iv: result.iv };
                })
                .catch((e) => {
                    handleEncryptionError(e);
                });
            await symmetricEncrypt(JSON.stringify(tasks), simkey)
                .then((result) => {
                    uplinkDoc['tasks'] = { cipher: result.cipher, iv: result.iv };
                })
                .catch((e) => {
                    handleEncryptionError(e);
                });
            await symmetricEncrypt(JSON.stringify(days), simkey)
                .then((result) => {
                    uplinkDoc['days'] = { cipher: result.cipher, iv: result.iv };
                })
                .catch((e) => {
                    handleEncryptionError(e);
                });

            uplinkDoc['tasksLog'] = encryptedChunkedTasksLog;

            uplinkDoc['tx'] = Date.now();
            if (updateCache === true) {
                try {
                    const currentCache = JSON.parse(localStorage.getItem('encryptedOfflineCache'));
                    let updatedCache = { ...currentCache, ...uplinkDoc, tx: Date.now() };
                    localStorage.setItem('encryptedOfflineCache', JSON.stringify(updatedCache));
                } catch (e) { }
            }
            return { status: true, uplinkDoc: uplinkDoc };
        })
        .catch((e) => {
            console.log(e);
            return { status: false, error: e };
        });
}


export { getUplinkDoc }