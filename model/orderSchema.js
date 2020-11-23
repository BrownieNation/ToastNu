const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    _orderID: Number,
//  orders      : [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    time        : Number,
    userID      : { type: String, ref: 'User' },
    orderItems  : [{type: Number, ref: 'OrderItem'}],


});


module.exports = mongoose.model('Order', orderSchema);
