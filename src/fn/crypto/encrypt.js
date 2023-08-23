
export default async function encrypt(plaintext, key) {
    const encoder = new TextEncoder();
    plaintext = encoder.encode(plaintext);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    return window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, plaintext).then((ciphertext) => {
        return { cipher: ciphertext, iv: iv };
    }).catch(e => console.log(e));
}