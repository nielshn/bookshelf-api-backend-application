const { EventEmitter } = require('events');

const myEventEmitter = new EventEmitter();

const birthdayEventListener = (name) => {
    console.log(`Happy birthday ${name}`);
}

myEventEmitter.on('birthday', birthdayEventListener);

myEventEmitter.emit('birthday', 'Daniel Siahaan');