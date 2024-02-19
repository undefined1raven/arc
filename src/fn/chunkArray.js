function chunkArray(chunkSize = 40, array) {
    if (isNaN(chunkSize)) throw new Error('Chunk Size must be a number');
    if (typeof (array) !== 'object') throw new Error('Array type must be object, got: [' + typeof (array) + '] instead.');

    if (array.length <= chunkSize) {
        return [array];
    }

    const chunkNumber = Math.ceil(array.length / chunkSize);

    let chunkedArray = [];

    for (let ix = 1; ix <= chunkNumber; ix++) {
        chunkedArray.push([]);
    }

    for (let ix = 0; ix < array.length; ix++) {
        const chunkIndex = Math.floor(ix / chunkSize);
        chunkedArray[chunkIndex].push(array[ix]);
    }
    return chunkedArray;
}

export { chunkArray }