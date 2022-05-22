const mongoose = require ('mongoose');

const LocationSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "id required"]
    },
    qCode: {
        type: String,
        required: [true, "Q Code required"]
    },
    city: {
        type: String,
        required: [true, "City required"]
    },
    state: {
        type: String,
        required: [true, "State required"]
    }
})
module.exports = mongoose.model('Location', LocationSchema)