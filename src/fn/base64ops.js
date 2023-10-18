function base64ToString(base64) {
    const binString = atob(base64);
    const raw = Uint8Array.from(binString, (m) => m.codePointAt(0));
    return new TextDecoder().decode(raw);
}

function stringToBase64(string) {
    const bytes = new TextEncoder().encode(string);
    const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
    return btoa(binString);
}

export { base64ToString, stringToBase64 };