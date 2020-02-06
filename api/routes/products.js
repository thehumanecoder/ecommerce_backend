const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const random = require('random');

const Product = require('../models/products');

//for saving an image
function isString (value) {
    return typeof value === 'string' || value instanceof String;
    }
const storage = multer.diskStorage({
    //defining storage destination
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    //creating and handling file name
    filename: function(req, file, cb) {
        cb(null, random.int(min = 1, max = 1000000) + file.originalname)
    }
});
//file filter for etension and type validation
const FileFilter = (re, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
    //image upload controller
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: FileFilter
});

//Getting all the products
router.get('/', (req, res, next) => {
    Product.find({}, {
            '__v': 0
        })
        .exec()
        .then(
            doc => {
                console.log(doc);
                if (doc != '') {
                    res.status(200).json(doc)
                } else {
                    res.status(404).json({
                        message: 'There is no product present at the current momment'
                    })
                }
            }
        )
        .catch(
            err => {
                console.log(err)
                res.status(500).json({ error: err });
            }
        )
});

//adding a product
router.post('/', upload.single('productImage'), (req, res, next) => {
    cat = req.body.category;
    console.log(req.body)

    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        brand:req.body.brand,
        category:req.body.category,
        weight:req.body.weight,
        size:req.body.size,
        grain:req.body.grain,
        description:req.body.description,
        vegitation:req.body.vegitation,
        discount:req.body.discount,
        preparation_time:req.body.preparation,
        stock:req.body.stock,
        available:req.body.available,
        productImage:req.body.productImage,
        price: req.body.price,
        store:req.body.store
    });
    product.save()
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Product added successfully' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//viewing a perticular product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No Data Found by the Given Id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});

//updating a product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        })
        .exec()
        .then(
            result => {
                console.log(result);
                res.status(200).json({
                    message: 'Product has been updated with the ID: ' + id
                });
            }
        )
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
        )

});

//deleting a product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndDelete({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Product Delete Successful"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ error: err });
        })
});

router.post('/bystore',(req,res,next)=>{
    var objectId = mongoose.Types.ObjectId(req.body.store);
    console.log(objectId)

    Product.find({store:objectId})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(error);
        res.status(404).json({
            error:err
        });
    });
});

router.post('/bystoreavail',(req,res,next)=>{
    var objectId = mongoose.Types.ObjectId(req.body.store);
    Product.find({store:objectId,available:true})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(error);
        res.status(404).json({
            error:err
        });
    });
});
router.post('/bystorenavail',(req,res,next)=>{
    var objectId = mongoose.Types.ObjectId(req.body.store);
    console.log(objectId)

    Product.find({store:objectId,available:false})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(error);
        res.status(404).json({
            error:err
        });
    });
});
router.post('/bystorestock',(req,res,next)=>{
    var objectId = mongoose.Types.ObjectId(req.body.store);
    console.log(objectId);
    
    Product.find({store:objectId},{name:true,stock:true,category:true})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(error);
        res.status(404).json({
            error:err
        });
    });
})
module.exports = router;