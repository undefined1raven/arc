import { SIDs } from "../SIDVault";
import { selectedSID } from "../selectedSID";


let selectedSIDActual = {};

selectedSID.subscribe(ss => {
    selectedSIDActual = ss;
})

/**
 * 
 * @param {*} key 
 * @param {*} value 
 */

function updateSelectedSID(key, value) {
    SIDs.update((sids) => {
        const SIDElm = sids.find((elm) => elm.SIDID === selectedSIDActual.SIDID);
        const ix = sids.indexOf(SIDElm);
        sids[ix][key] = value;
        selectedSID.set(sids[ix]);
        return sids;
    });
}

export { updateSelectedSID }