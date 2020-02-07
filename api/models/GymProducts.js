const mongoose = require('mongoose');
const gymProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    storeId:mongoose.Schema.Types.storeId,
    name: {
        type: String,
        required: true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    weight:{
        type:String,
    },
    size:{
        type:String,
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    discount:{
        type:String
    },
    preparation_time:{
        type:String
    },
    stock:{
        type:String
    },
    available:{
        type:Boolean
    },
    productImage:{
        type:String
    }
   
});

module.exports = mongoose.model('gymProduct', gymProductSchema);