import { importSymmetricKey, str2ab, unwrapKey } from "./crypto/keyOps";
import symmetricDecrypt from "./crypto/symmetricDecrypt";
import symmetricEncrypt from "./crypto/symmetricEncrypt";


function handleEncryptionError(e) {
    return { status: false, error: e }
}


/**
 * 
 * @param SIDs SIDs 
 * @param statusArray statusArray 
 * @param vaultPIN vaultPIN
 * @param boolean updateCache
 * @returns Object {status: true|false, uplinkDoc: uplinkDoc(if successful) else error: e}
 */
async function getSIDUplinkDoc(SIDs, statusArray, vaultPIN, updateCache) {
    let tess_simkey = localStorage.getItem('tess_simkey');
    try {
        const parsedTessSimkey = JSON.parse(tess_simkey);
        if (parsedTessSimkey.key !== undefined && parsedTessSimkey.iv !== undefined && parsedTessSimkey.salt !== undefined) {
            return unwrapKey(str2ab(parsedTessSimkey.key), vaultPIN, str2ab(parsedTessSimkey.salt), str2ab(parsedTessSimkey.iv)).then(key => {
                let encryptionPromiseArray = [];
                let exportSIDs = [];
                for (let ix = 0; ix < SIDs.length; ix++) {
                    encryptionPromiseArray.push(symmetricEncrypt(JSON.stringify(SIDs[ix]), key));
                }
                return Promise.allSettled(encryptionPromiseArray).then(async (arr) => {
                    for (let ix = 0; ix < arr.length; ix++) {
                        exportSIDs.push({ SIDID: SIDs[ix].SIDID, cipher: arr[ix].value.cipher, iv: arr[ix].value.iv });
                    }
                    var exportStatusArray;
                    await symmetricEncrypt(JSON.stringify(statusArray), key).then(r => {
                        exportStatusArray = { cipher: r.cipher, iv: r.iv };
                    });
                    if (updateCache === true) {
                        const currentCache = localStorage.getItem('encryptedOfflineCache');
                        let updateFragment = { SIDs: exportSIDs, statusArray: exportStatusArray, tx: Date.now() };
                        if (currentCache === null) {
                            localStorage.setItem('encryptedOfflineCache', JSON.stringify({ ...updateFragment, tx: Date.now() }));
                        } else {
                            try {
                                const parsedCurrentCache = JSON.parse(currentCache);
                                localStorage.setItem('encryptedOfflineCache', JSON.stringify({ ...parsedCurrentCache, ...updateFragment, tx: Date.now() }))
                            } catch (e) { }
                        }
                    }
                    return { status: true, uplinkDoc: { SIDs: exportSIDs, statusArray: exportStatusArray, tx: Date.now() } };
                }).catch(e => {
                    console.log(e)
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


export { getSIDUplinkDoc }