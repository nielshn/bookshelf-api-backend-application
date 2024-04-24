class Tiger {
    constructor(){
        this.strength = Math.floor(Math.random() * 100)
    }

    growl (){
        console.log('grrrrr')
    }
}


// TODO: Export Tiger class
module.exports = Tiger