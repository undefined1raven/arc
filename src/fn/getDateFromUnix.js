import { datePadding } from "./datePadding";

function getDateFromUnix(unix) {
    if (unix === undefined) {
        throw new Error('Unix argument is undefined')
    }
    if (isNaN(parseInt(unix)) === true) {
        throw new Error('Unix timestamp is not valid')
    }
    const date = new Date(unix);
    let locDate = date.toLocaleDateString();
    let revlocDate = `${locDate.split('/')[2]}-${datePadding(locDate.split('/')[0])}-${datePadding(
        locDate.split('/')[1]
    )}`;
    return revlocDate;
}

export default getDateFromUnix;