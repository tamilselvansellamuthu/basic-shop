const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Number,
        required: true
    }
});

const TokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    tokens: [childSchema]
});

const Token = module.exports = mongoose.model('Token', TokenSchema);