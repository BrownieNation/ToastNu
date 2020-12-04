const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    orderNumber : Number,
    date        : String,
    userID      : String,
    products    : Array
});


module.exports = mongoose.model('completedorders', orderSchema);
