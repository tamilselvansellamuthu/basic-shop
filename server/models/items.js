// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Items', new Schema({
    id: Number,
    name: String,
    non_veg: Boolean,
    catagory: String,
    price: Number
}));