const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const StoreDetails = require('../models/storeDetails');

router.post('/', (req, res, next) => {
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
module.exports = router;