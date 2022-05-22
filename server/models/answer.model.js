const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    total: {
        type: Number
    }
})
module.exports = mongoose.model('Location', AnswerSchema)