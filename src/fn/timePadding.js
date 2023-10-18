function timePadding(str) {
    if (str !== undefined) {
        let lstr = str.toString();
        return lstr.padStart(2, '0');
    } else {
        return '';
    }
}


export default timePadding;