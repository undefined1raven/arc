export function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

export function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export async function exportCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey("jwk", key);
    return JSON.stringify(exported);
}


export function importPrivateKey(jwk) {
    return window.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
            name: "RSA-OAEP",
            hash: 'SHA-256',
        },
        true,
        ["decrypt"],
    );
}


export function importSymmetricKey(jwk) {
    return window.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );
}

export function importPublicKey(jwk) {
    return window.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
            name: "RSA-OAEP",
            hash: 'SHA-256',
        },
        true,
        ["encrypt"],
    );
}