const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    userid: {
        type: String,
        requird: true,
        unique: true
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
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);