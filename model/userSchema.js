const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    _userID: {
        type: String,
        required: true,
        trim: true, 
        unique : true
    },
    name: {
        type: String,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        

    },
    phoneNumber: {
        type: Number,
        minlength: 8
    },

    isAdmin: {
        type: Boolean
    },
    loggedIn: {
        type: Boolean
    }
    // orders      : [{type: Number, ref: 'Order'}]

});

const User = mongoose.model('users', userSchema);

module.exports = User;
