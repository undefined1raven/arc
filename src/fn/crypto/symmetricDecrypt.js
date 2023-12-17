import { str2ab } from "./keyOps";

export default async function symmetricDecrypt(cipher, key, iv) {
    if (cipher === undefined || iv === undefined) {
        throw new Error(`${cipher === undefined ? 'Cipher is undefined' : 'IV is undefined'}`);
    }
    return await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: str2ab(iv) }, key, str2ab(cipher)).then((decrypted) => {
        return new TextDecoder().decode(decrypted);
    });
}