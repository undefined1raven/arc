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



function getKeyMaterial(password) {
    const enc = new TextEncoder();
    return window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
}


/*
Given some key material and some random salt
derive an AES-KW key using PBKDF2.
*/
function getKey(keyMaterial, salt) {
    return window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            salt: salt,
            "iterations": 100000,
            "hash": "SHA-256"
        },
        keyMaterial,
        { "name": "AES-CBC", "length": 256 },
        true,
        ["wrapKey", "unwrapKey"]
    );
}


export async function wrapCryptoKey(keyToWrap, password) {
    // get the key encryption key
    const keyMaterial = await getKeyMaterial(password);
    let salt = window.crypto.getRandomValues(new Uint8Array(16));
    const wrappingKey = await getKey(keyMaterial, salt);
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const wrappedKey = await window.crypto.subtle.wrapKey(
        "raw",
        keyToWrap,
        wrappingKey,
        { name: "AES-CBC", iv: iv }
    );

    return { wrappedKey: wrappedKey, salt: salt, iv: iv };
}


export async function unwrapKey(wrappedKey, password, salt, iv) {
    const keyMaterial = await getKeyMaterial(password);
    const unwrappingKey = await getKey(keyMaterial, salt);
    return window.crypto.subtle.unwrapKey('raw', wrappedKey, unwrappingKey, { name: 'AES-CBC', iv: iv }, { 'name': 'AES-GCM' }, true, ['encrypt', 'decrypt']);
}