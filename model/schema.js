//schema.js

const mongoose = require('mongoose');
Schema = new mongoose.Schema

var userSchema = Schema({
    _userID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number,
    orders: [{type: Number, ref: 'Order'}]

});

var orderSchema = Schema({
    _orderID: Number,
//  orders      : [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    date : Date,
    userID      : { type: String, ref: 'User' },
    orderItems: [{type: Number, ref: 'OrderItem'}],
    userID      : { type: Number, ref: 'User' },


});

var productSchema = Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number,
    catogory : String,
    orderItems: [{type: Number, ref: 'OrderItem'}]
});

var orderItemsSchema = Schema({
    _orderItemID    : Number,
    productID       : { type: Schema.Types.ObjectId, ref: 'Product'},
    orderID     : { type: Schema.Types.ObjectId, ref: 'Order' },
    amount          : Number

});

const  User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const OrderItem = mongoose.model('OrderItems', orderItemsSchema);

module.exports = User;
module.exports = Product;
module.exports = Order;
module.exports = OrderItem;


