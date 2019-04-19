const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    non_veg:{
        type: Boolean,
        required: true
    },
    catagory:{
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const OrderSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    items: [itemSchema]
});

const Token = module.exports = mongoose.model('Orders', OrderSchema);