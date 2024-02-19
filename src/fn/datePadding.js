function datePadding(date) {
    if (date.toString().length === 1) {
        return `0${date}`;
    } else {
        return date.toString();
    }
}


export { datePadding }