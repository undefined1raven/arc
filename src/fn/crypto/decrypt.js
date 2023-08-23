

export default async function decrypt(ciphertext, iv, key) {
    return window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ciphertext).then((plaintext) => {
        const decoder = new TextDecoder();
        return decoder.decode(plaintext);
    }).catch(e => console.log(e));
}