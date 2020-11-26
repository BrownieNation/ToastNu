const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    date        : String,
    userID      : String,
    products    : Array
});


module.exports = mongoose.model('orders', orderSchema);
