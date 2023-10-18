
export function getNewKey() {
    return window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
    },
        true,
        ["encrypt", "decrypt"]).then((key) => {
            return key;
        }).catch(e => console.log(e));
}


export function getNewSymmetricKey() {
    return window.crypto.subtle.generateKey({
        name: "AES-GCM",
        length: 256,
    },
        true,
        ["encrypt", "decrypt"]).then((key) => {
            return key;
        }).catch(e => console.log(e));
}
