import domainGetter from "../../fn/domainGetter";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";

async function isPasskeySupported() {
    if (window.PublicKeyCredential &&
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
        PublicKeyCredential.isConditionalMediationAvailable) {
        // Check if user verifying platform authenticator is available.  
        return Promise.all([
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
            PublicKeyCredential.isConditionalMediationAvailable(),
        ]).then(results => {
            return results.every(r => r === true)
        }).catch(e => {
            return false;
        })
    }
}


async function passkeySetup() {
    const hasPasskeySupport = await isPasskeySupported();
    console.log(hasPasskeySupport)
    let regResponse;
    let response = await (await fetch(domainGetter('/auth/authnRegisterStart'), { credentials: 'include' })).json();
    if (response.error === undefined && response.opts !== undefined && response.regsID !== undefined) {
        regResponse = await startRegistration(response.opts);
        fetch(domainGetter('/auth/authnRegisterVerify'), { method: 'POST', credentials: 'include', body: JSON.stringify({ regs: regResponse, regsID: response.regsID }) }).then(async res => {
            let resx = await res.json();
            console.log(resx);
        }).catch(e => {
            console.log(e)
        })
    }
}


async function passkeyAuth() {
    let response = await (await fetch(domainGetter('/auth/authnAuthenticationStart'), { credentials: 'include' })).json();
    if (response.error === undefined && response.opts !== undefined && response.regsID !== undefined) {
        let authResponse = await startAuthentication(response.opts);
        fetch(domainGetter('/auth/authnAuthenticationVerify'), { method: 'POST', credentials: 'include', body: JSON.stringify({ regs: authResponse, regsID: response.regsID }) }).then(async res => {
            let resx = await res.json();
            console.log(resx);
        }).catch(e => {
            console.log(e)
        })
    }
}



export { passkeySetup, passkeyAuth };