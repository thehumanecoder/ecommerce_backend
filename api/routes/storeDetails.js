const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const StoreDetails = require('../models/storeDetails');
const ObjectId = require('mongodb').ObjectID;

router.post('/add', (req, res, next) => {
    const storeDetails = new StoreDetails({
        _id: new mongoose.Types.ObjectId(),
        storeid: req.body.storeid,
        gst: req.body.gst,
        location: req.body.location,
        address: req.body.address,
        ownername: req.body.ownername,
        ownermobile: req.body.ownermobile,
        accountdeails: req.body.accountdeails,
    });
    storeDetails.save()
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Store Details added successfully' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/:storeid',(req,res,next)=>{
    var id = ObjectId(storeid)
   StoreDetails.findOne({storeid:id},{'__v':0})
   .exec()
   .then(
       doc=>{
           console.log(doc);
           if(doc != ''){
               res.status(200).json(doc)
           }else{
               res.status(404).json({
                   message:"There is no details present for the current store"
               })
           }
       }
   )
   .catch()
})

router.post('/update/:storeid',(req,res,next)=>{
    var id = ObjectId(storeid);
    StoreDetails.findOne({storeid:id})
});
module.exports = router;