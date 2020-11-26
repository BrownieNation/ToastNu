const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    _userID     : {
        type: String,
        required: true,
        trim: true, 
        unique
    },
    name        : {
        type: String,
        requred: true,
        trim: true

    },
    password    : {
        type: String,
        requred: true,
        minlength: 6,
        trim: true,
        

    },
    phoneNumber : {
        type: Number,
        minlength: 8
    }
    // orders      : [{type: Number, ref: 'Order'}]

});

const User = mongoose.model('users', userSchema);

module.exports = User;
