const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const secret = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKu0QECTWJRKBcky/p3F/oEZy/g6GTKu70NCK2xMqEL4OiU/0X+0YvFmC52Vm5AyO7rQ4SPw2cHWeaGt1+jOitrIXXldEj1IaX1+bxwc+ojpn+EHJdJLl75mXzzdTftFzmnhcfTNaFfxPAkL36WAj3DXg/lzS4cGc4/kW/YpCCJLAgMBAAECgYAy1xtTQ42t0sEl0uibNL3n4giIBkPhwvRrWNNcrNIBilhFIUFZ68KEMa/syBiYuJcA+MpBBxajE2tOWRgeAdIQ+2oiVN6EIxfk9g3rOFVYe7D4lfJzJrKwlwgcpV0awI0bWZTpELjtR01m9gyqHW9mYJUrg1mtJr3OOHFtHeyRwQJBAN+lSWMnE/y6MmqBBHxg9ngTa9I6eOYJb7hSB4Bt23JNde0XxjNaUMpWPzzrP7nRasRfOt3f1NKDDokbVHjGrqsCQQDEi09ZEJM5Ir1q75523VgefvwTEST0ZJbEarHQeKQZNvHIJ29r13a+e75kFl2zg5jDHFpQYcgtERdaBFxpAdrhAkEAnhWis1CrIyimfHwoJJcRgT0RKPAmB0zCSMLLBLAiv0AbzHTSp/f+RZgDaVdMm1d5Jce+v5j5Qbhb7PSBmEGwswJAXltfKawacfiqpTcKhZg4INPn4qN9cVMFSqDKYwI4Dd7h7qx4Anb7i/FOczCFpZQM98aZ2TNIbdJhupaTYtpAIQJBAM7idlDhr70N2wUJk8iBac9zgUndPRZxfzxpHHNA8rl5rVLX0pKvJdTSqKLgrXYg+NXhLp9Bu1ar70siDmTcmz0=";


// create admin method

router.post('/add', (req, res, next) => {
    Admin.findOne({ 'email': req.body.email })
        .exec()
        .then(
            admin => {
                if (admin) {
                    return res.status(401).json({
                        message: "Admin already exists",
                    });
                } else {
                    bcrypt.hash(req.body.password, 5, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        } else {
                            const admin = new Admin({
                                _id: new mongoose.Types.ObjectId(),
                                name: req.body.name,
                                userid: req.body.userid,
                                email: req.body.email,
                                password: hash,
                                category: req.body.category,
                                role: req.body.role,
                            });
                            admin.save()
                                .then(result => {
                                    console.log(result);
                                    return res.status(200).json({
                                        message: "User Added"
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({
                                        error: err
                                    });
                                });
                        }
                    });
                }
            }
        )
});

router.post('/login', (req, res, next) => {
    Admin.findOne({ email: req.body.email })
        .exec()
        .then(
            admin => {
                if (admin.length < 1) {
                    return res.status(401).json({
                        message: 'No admin found with this email id'
                    })
                }

                bcrypt.compare(req.body.password, admin.password, (err, result) => {

                    if (result) {
                        console.log()
                        const token = jwt.sign({
                                email: admin.email,
                                id: admin._id
                            },
                            secret, {
                                expiresIn: "12h"
                            })
                        console.log(admin)
                        Admin.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } }, { upsert: true })
                        return res.status(200).json({
                            message: "Authorized",
                            token: token,
                            admin_id: admin.id,
                            admin_name: admin.name,
                            admin_email: admin.email,
                            category: admin.category,
                            role: admin.role
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

router.post('/:id', (req, res, next) => {
    Admin.findByIdAndDelete(req.body.id).exec()
        .then(result => {
            return res.status(200).json({
                message: 'User Deleted'
            });
        }).catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
});

router.get('/', (req, res, next) => {
    Admin.find({})
        .exec()
        .then(result => {
            return res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
});

router.get('/:id', (req, res, next) => {
    Admin.findOne(req.body.id)
        .exec()
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
});

module.exports = router;