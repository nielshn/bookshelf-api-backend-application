const fs = require('fs');

const fileReadCallback = (error, data) => {
    if (error) {
        console.log('Gagal membaca berkas', error.message);
        return;
    }
    console.log(data);
};

fs.readFile('notes.txt', 'UTF-8', fileReadCallback);