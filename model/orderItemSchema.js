const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
    _orderItemID    : Number,
    productID       : { type: Number, ref: 'Product'},
    amount          : Number

});


module.exports = mongoose.model('OrderItems', orderItemsSchema);
