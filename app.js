const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const storeRoutes = require('./api/routes/store');
const adminRoutes = require('./api/routes/admin');
const storeDeatilsRoutes = require('./api/routes/storeDetails');
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pacecart:Kronose@007@pacecart-psmxs.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, });
// mongoose.connect('mongodb://127.0.0.1:27017/pacecart', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/store', storeRoutes);
app.use('/admin', adminRoutes);
app.use('/storedetails', storeDeatilsRoutes);

app.use((req, res, next) => {
    res.status(200).json({ message: 'Pacecart Server is Up And Running' });
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;