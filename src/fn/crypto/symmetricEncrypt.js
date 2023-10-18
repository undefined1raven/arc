import { ab2str } from "./keyOps";


export default async function symmetricEncrypt(plaintext, key) {
    let encoded = new TextEncoder().encode(plaintext);
    let iv = window.crypto.getRandomValues(new Uint8Array(12));
    return await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encoded).then((encrypted) => {
        return { cipher: ab2str(encrypted), iv: ab2str(iv) };
    });
}