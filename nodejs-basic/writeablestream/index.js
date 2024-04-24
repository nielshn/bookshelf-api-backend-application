const fs = require('fs');
const { resolve } = require('path');

const readableStream = fs.createReadStream(resolve(__dirname, 'input.txt'), {
    highWaterMark: 15
});


const writeableStream = fs.createWriteStream(resolve(__dirname, 'output.txt'));
readableStream.on('readable', () => {
    try {
        writeableStream.write(`${readableStream.read()}\n`)
    } catch (error) {
        console.error(error);
    }
})

readableStream.on('end', () => {
    writeableStream.end();
})
