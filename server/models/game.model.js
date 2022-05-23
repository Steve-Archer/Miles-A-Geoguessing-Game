const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({

    rounds: {
        type: Array,
        required: [true]
    }
})
module.exports = mongoose.model('Game', GameSchema)