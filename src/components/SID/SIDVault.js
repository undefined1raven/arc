import { writable } from "svelte/store";
import { v4 } from 'uuid';
import { appColors } from "../../config/appColors";

const SIDs = writable([
    { SIDID: 'SIDID-0', alias: '[ST]', CID: '7X94', firstContact: Date.now(), notes: [], info: [], ring: 0, statusID: 'STID-3', tx: Date.now(), show: true }]);

const statusArray = writable([{ name: 'Ongoing', id: 'STID-1', color: '#00FF75', show: true },
{ name: 'Alive', id: 'STID-3', color: '#00FF75', show: true },
{ name: 'No Contact', id: 'STID-2', color: '#494949', show: true }]);

const availableSIDs = writable(0);
const SIDsImported = writable(false);

export { SIDs, statusArray, availableSIDs, SIDsImported }