const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number,
    orderItems: [{type: Number, ref: 'OrderItem'}]
});

const Product = mongoose.model('Product', productSchema);
module.exports.Product = Product;