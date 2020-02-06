const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Store = require('../models/store');
const secret = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKu0QECTWJRKBcky/p3F/oEZy/g6GTKu70NCK2xMqEL4OiU/0X+0YvFmC52Vm5AyO7rQ4SPw2cHWeaGt1+jOitrIXXldEj1IaX1+bxwc+ojpn+EHJdJLl75mXzzdTftFzmnhcfTNaFfxPAkL36WAj3DXg/lzS4cGc4/kW/YpCCJLAgMBAAECgYAy1xtTQ42t0sEl0uibNL3n4giIBkPhwvRrWNNcrNIBilhFIUFZ68KEMa/syBiYuJcA+MpBBxajE2tOWRgeAdIQ+2oiVN6EIxfk9g3rOFVYe7D4lfJzJrKwlwgcpV0awI0bWZTpELjtR01m9gyqHW9mYJUrg1mtJr3OOHFtHeyRwQJBAN+lSWMnE/y6MmqBBHxg9ngTa9I6eOYJb7hSB4Bt23JNde0XxjNaUMpWPzzrP7nRasRfOt3f1NKDDokbVHjGrqsCQQDEi09ZEJM5Ir1q75523VgefvwTEST0ZJbEarHQeKQZNvHIJ29r13a+e75kFl2zg5jDHFpQYcgtERdaBFxpAdrhAkEAnhWis1CrIyimfHwoJJcRgT0RKPAmB0zCSMLLBLAiv0AbzHTSp/f+RZgDaVdMm1d5Jce+v5j5Qbhb7PSBmEGwswJAXltfKawacfiqpTcKhZg4INPn4qN9cVMFSqDKYwI4Dd7h7qx4Anb7i/FOczCFpZQM98aZ2TNIbdJhupaTYtpAIQJBAM7idlDhr70N2wUJk8iBac9zgUndPRZxfzxpHHNA8rl5rVLX0pKvJdTSqKLgrXYg+NXhLp9Bu1ar70siDmTcmz0=";
// create store method
router.post('/add', (req, res, next) => {
    Store.findOne({ 'email': req.body.email })
        .exec()
        .then(
            store => {
                if (store) {
                    return res.status(401).json({
                        message: "Store Already Exists",
                    });
                } else {
                    bcrypt.hash(req.body.password, 5, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const store = new Store({
                                _id: new mongoose.Types.ObjectId(),
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                role: req.body.role,
                                category: req.body.category,
                            });
                            store.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(200).json({
                                        message: 'Store Created'
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                        }
                    })
                }
            }
        )
});

// login method
router.post('/login', (req, res, next) => {
    Store.findOne({ email: req.body.email })
        .exec()
        .then(
            store => {
                if (store.length < 1) {
                    return res.status(401).json({
                        message: 'No store found with this email id'
                    })
                }

                bcrypt.compare(req.body.password, store.password, (err, result) => {

                    if (result) {
                        console.log()
                        const token = jwt.sign({
                                email: store.email,
                                id: store._id
                            },
                            secret, {
                                expiresIn: "12h"
                            })
                        console.log(store)
                        Store.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } }, { upsert: true })
                        return res.status(200).json({
                            message: "Authorized",
                            token: token,
                            store_id: store.id,
                            store_email: store.email,
                            category: store.category,
                            role: store.role
                        })

                    } else if (err) {
                        return res.status(401).json({
                            message: "Auth Failed"
                        })

                    }
                    res.status(401).json({
                        message: "Auth Failed"
                    })
                });
            }

        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:id', (req, res, next) => {
    Store.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Store Deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', (req, res, next) => {
    Store.find({})
        .exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:id', (req, res, next) => {
    Store.findById(req.params.id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;