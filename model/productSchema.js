const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _productID         : Number,
    productName        : String,
    productDescription : String,
    productPrice       : Number,
    productImage       : String,
    productCategory    : String,
//    orderItems: [{type: Number, ref: 'OrderItem'}]
});

 
module.exports = mongoose.model('products', productSchema);
