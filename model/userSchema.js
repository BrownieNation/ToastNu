const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _userID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number,
    orders      : [{type: Number, ref: 'Order'}]

});

module.exports = mongoose.model('User', userSchema);
