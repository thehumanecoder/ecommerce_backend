const mongoose = require('mongoose');
const storeDetailsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    storeid: {
        type: mongoose.Schema.Types.ObjectId
    },
    gst: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    ownername: {
        type: String,
        required: true,
    },
    ownermobile: {
        type: String,
        required: true,
    },
    accountdetails: {
        type: String,
    }
});

module.exports = mongoose.model('StoreDetails', storeDetailsSchema)