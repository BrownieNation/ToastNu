const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    _orderID: Number,
//  orders      : [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    date : Date,
    userID      : { type: String, ref: 'User' },
    orderItems: [{type: Number, ref: 'OrderItem'}],
    userID      : { type: Number, ref: 'User' },


});

const Order = mongoose.model('Order', orderSchema);
module.exports.Order = Order;