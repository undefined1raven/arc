

export default async function decrypt(ciphertext, key) {
    return window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, key, ciphertext).then((plaintext) => {
        const decoder = new TextDecoder();
        return decoder.decode(plaintext);
    }).catch(e => console.log(e));
}