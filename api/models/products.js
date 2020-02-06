const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    grain:{
        type:String
    },
    description:{
        type:String
    },
    vegitation:{
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
        type:Number
    },
    available:{
        type:Boolean
    },
    productImage:{
        type:String
    },
    store:{
        type:mongoose.Schema.Types.ObjectId
    }
   
});

module.exports = mongoose.model('Product', productSchema);