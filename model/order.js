//order.js

const mongoose = require('mongoose');

const order = new mongoose.Schema({
    productName: String,
    productPrice: int,
    
})

module.exports = mongoose.model('Order', Order);