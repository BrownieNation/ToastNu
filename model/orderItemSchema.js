const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    _orderItemID    : Number,
    productID       : { type: Number, ref: 'Product'},
    orderID     : { type: Number, ref: 'Order' },
    amount          : Number

});


module.exports = mongoose.model('OrderItems', orderItemsSchema);
