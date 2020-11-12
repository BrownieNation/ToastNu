//user.js

const mongoose = require('mongoose')
, Schema = mongoose.Schema


var userSchema = Schema({
    _id         : Number,
    name        : String,
    password    : String,
    phoneNumber : Number

});

var orderSchema = Schema({
    _userOrderID: Number,
    orders      : [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    userID      : { type: Number, ref: 'User' },
    amount      : Number

})

var productSchema = Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number

})

var orderItemsSchema = Schema({
    _orderItemID    : Number,
    productID       : { type: Number, ref: 'Product'},

});





module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Product', productSchema);
module.exports = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('OrderItems', orderItemsSchema);