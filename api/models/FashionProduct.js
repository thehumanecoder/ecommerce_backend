const mongoose = require('mongoose');
const fashionProductSchema = mongoose.Schema({
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
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true
    },
    mathcing:{
        type:Boolean,
        required:true,
    },
    price:{
        type:String
    },
    discount:{
        type:String
    },
    stock:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        required:true,
    },
    productImage:{
        type:String
    }
   
});

module.exports = mongoose.model('fashionProduct', fashionProductSchema);