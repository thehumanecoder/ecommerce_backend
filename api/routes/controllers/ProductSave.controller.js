const express = require('express');
const mongoose = require('mongoose');

const Product = require('../../models/products');
const Fashion = require('../../models/FashionProduct');
const Gym = require('../../models/GymProducts');
const Fashion = require('../../models/FashionProduct');
const Bakery = require('../../models/Bakeryproduct');
const Grosery = require('../../models/Grossery');

async function saveFashion(data){
    console.log('Adding Fashion Product');
    const fashion =await new Fashion({
    _id:new mongoose.Types.ObjectId(),
    storeid:mongoose.Types.ObjectId(),
    name:data.name,
    brand:data.brand,
    gender:data.gender,
    age:data.age,
    position:data.position,
    size:data.size,
    color:data.color,
    matching:data.matching,
    price:data.price,
    discount:data.discount,
    stock:data.stock,
    available:data.available,
    productImage:data.productImage
    });

    await fashion.save()
    .then(result=>{
        console.log(result);
        return result;
    }).catch(err=>{
        console.log(err);
        return err;
    })
}

async function saveGym(data){
    console.log('Adding Gym Instrument');
    const gym = await new Gym({
        _id:new mongoose.Types.ObjectId(),
        storeid:mongoose.Types.ObjectId(),
        name:data.name,
        brand:data.brand,
        category:data.category,
        wight:data.weight,
        size:data.size,
        description:data.description,
        price:data.price,
        discount:data.discount,
        preparation_time:data.preparation_time,
        stock:data.stock,
        available:data.available,
        productImage:data.productImage
    });

    await gym.save()
    .then(result=>{
        console.log(result);
        return result;
    }).catch(error=>{
        console.log(result);
        return result;
    })


}

async function addGrocery(data){
    console.log('Adding Grosery Items');
    const grosery =await new Grosery({
        _id:new mongoose.Types.ObjectId(),
        storeid:mongoose.Types.ObjectId(),
        name:data.name,
        brand:data.brand,
        category:data.category,
        weight:data.weight,
        size:data.size,
        description:data.description,
        price:data.price,
        discount:data.discount,
        preparation_time:data.preparation_time,
        stock:data.stock,
        available:data.available,
        productImage:data.productImage
    });

    await grosery.save()
    .then(result=>{
        console.log(result);
        return result;
    }).catch(err=>{
        console.log(err);
        return err;
    })
}

async function addBakery(data){
    console.log('Adding Bakery');
    const bakery = await new Bakery({
        _id:new mongoose.Types.ObjectId(),
        storeid:mongoose.Types.ObjectId(),
        name:data.name,
        brand:data.brand,
        category:data.category,
        weight:data.weight,
        size:data.size,
        grain:data.grain,
        vegiterian:data.vegiterian,
        description:data.description,
        price:data.price,
        discount:data.discount,
        preparation_time:data.preparation_time,
        stock:data.stock,
        available:data.available,
        productImage:data.productImage
    })
}
module.exports=saveProduct

