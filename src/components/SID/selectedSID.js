import { writable } from "svelte/store";
import globalStyle from "../../stores/globalStyles";
import { v4 } from 'uuid'
import { appColors } from "../../config/appColors";

const selectedSID = writable({
    SIDID: 'x',
    alias: 'A/V',
    CID: '1814',
    firstContact: Date.now(),
    notes: [{ tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid },
    { tx: Date.now(), content: 'hiii', name: 'Nicer', NID: `NID-${v4()}`, color: appColors.sid }
    ],
    info: [],
    ring: 3,
    statusID: 'STID-1',
    tx: Date.now(),
});

export { selectedSID }