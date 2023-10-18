import { str2ab } from "./keyOps";

export default async function symmetricDecrypt(cipher, key, iv) {
    return await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: str2ab(iv) }, key, str2ab(cipher)).then((decrypted) => {
        return new TextDecoder().decode(decrypted);
    });
}