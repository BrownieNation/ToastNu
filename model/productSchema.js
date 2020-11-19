const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number,
    orderItems: [{type: Number, ref: 'OrderItem'}]
});

// const Product = 
module.exports = mongoose.model('Product', productSchema);;