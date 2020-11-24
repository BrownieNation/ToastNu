const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    _orderID    : Number,
    date        : Number,
    userID      : Number,
    products    : []


});


module.exports = mongoose.model('Order', 'order', 'Orders', 'orders', orderSchema);
