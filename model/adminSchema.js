const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    // _adminID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number,
    isEmployee  : Boolean,
});

module.exports = mongoose.model('admins', adminSchema);