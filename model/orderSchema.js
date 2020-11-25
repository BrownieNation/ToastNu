const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    date        : Date,
    userID      : Number,
    products    : Array
});


module.exports = mongoose.model('orders', orderSchema);
