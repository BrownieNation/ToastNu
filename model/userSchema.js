const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _userID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number,
    orders: [{type: Number, ref: 'Order'}]

});

const User = mongoose.model('User', userSchema);
module.exports.User = User;
