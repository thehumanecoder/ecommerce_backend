const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/orders');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling a GET request'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'Handling POST request to orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered a special item'
        });
    } else {
        res.status(403).json({
            message: 'Sorry we could not find any matching data'
        })
    }
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated given ID'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete order!'
    });
});

module.exports = router;