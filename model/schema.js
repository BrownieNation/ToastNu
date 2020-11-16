//schema.js

const mongoose = require('mongoose');
// Schema = new mongoose.Schema

var userSchema = new mongoose.Schema({
    _userID     : String,
    name        : String,
    password    : String,
    phoneNumber : Number,
    orders: [{type: Number, ref: 'Order'}]

});


var orderSchema = new mongoose.Schema({

    _orderID: Number,
//  orders      : [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    date : Date,
    userID      : { type: String, ref: 'User' },
    orderItems: [{type: Number, ref: 'OrderItem'}],
    userID      : { type: Number, ref: 'User' },


});

var productSchema = new mongoose.Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number,
    orderItems: [{type: Number, ref: 'OrderItem'}]
});

var orderItemsSchema = new mongoose.Schema({
    _orderItemID    : Number,
    productID       : { type: Number, ref: 'Product'},
    orderID     : { type: Number, ref: 'Order' },
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


