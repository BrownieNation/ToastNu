const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    _orderItemID    : Number,
    productID       : { type: Number, ref: 'Product'},
    orderID     : { type: Number, ref: 'Order' },
    amount          : Number

});

const OrderItem = mongoose.model('OrderItems', orderItemsSchema);
module.exports.OrderItem = OrderItem;