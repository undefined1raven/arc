
export default function getNewKey() {
    return window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]).then((key) => {
        return key;
    }).catch(e => console.log(e));
}