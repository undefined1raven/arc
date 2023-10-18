
export default async function encrypt(plaintext, key) {
    const encoder = new TextEncoder();
    plaintext = encoder.encode(plaintext);
    return window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, plaintext).then((cipher) => {
        return cipher;
    }).catch(e => console.log(e));
}