import timePadding from "./timePadding";

function getTimeFromUnix(unixTimestamp) {
    if (typeof (unixTimestamp) !== 'number') {
        throw new Error('Unix Time Invalid');
    } else {
        try {
            const date = new Date(unixTimestamp);
            return `${timePadding(date.getHours())}:${timePadding(date.getMinutes())}`
        } catch (e) {
            console.log(e)
        }
    }
}


export { getTimeFromUnix }