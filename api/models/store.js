const mongoose = require('mongoose');
const storeSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Store', storeSchema)