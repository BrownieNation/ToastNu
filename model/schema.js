//schema.js

const mongoose = require('mongoose')
, Schema = mongoose.Schema


var userSchema = Schema({
    _userID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number

});

var orderSchema = Schema({
    _userOrderID: Number,
    userID      : { type: Number, ref: 'User' },

})

var productSchema = Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number

})

var orderItemsSchema = Schema({
    _orderItemID    : Number,
    productID       : [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    userOrderID     : [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    amount          : Number

});


module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Product', productSchema);
module.exports = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('OrderItems', orderItemsSchema);