const mongoose = require('mongoose');
const config = require('../config');

const User = require('../model/userSchema');
const Product = require('../model/productSchema');
const Order = require('../model/orderSchema');
const OrderItem = require("../model/orderItemSchema");
let preProducts = require('../product');

// const preUsers = require('../user');
// const preOrders = require('../order');
// const preOrederItems = require('../orderItem');


mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })

async function createUser() {
    for (u of User.users) {
        await User.create({
            name: u.name,
            password: u.password,
            phoneNumber: u.phoneNumber
        });
    }
}



exports.getUser = function (_userId) {
    return User.findById(_userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('users').exec();
};

async function createProduct() {
    for (p of preProducts.Produkter) {
        await Product.create({
            _productID: p._productID,
            productName: p.productName,
            productDescription: p.productDescription,
            productPrice: p.productPrice,
            
        })
        
        console.log('Produkt oprettet')
    }
};
// exports.createProduct = function (productName, productDescription, productPrice){
//     return Product.create({
//         productName,
//         productDescription ,
//         productPrice
//     });
// };

// exports.createProduct = function (_productID, productName, productDescription, productPrice) {
//     return Product.create({
//         _productID,
//         productName,
//         productDescription,
//         productPrice
//     });
// };

exports.getProduct = function (productID) {
    return Product.findById(productID).exec();
};

exports.getProducts = function () {
    return Product.find().populate('products').exec();
};

exports.createOrder = function (userID) {
    return Order.create({
        userID,
        date
    });
};

exports.getOrder = function (_orderID) {
    return Product.findById(_orderID).exec();
};

exports.getOrders = function () {
    return Product.find().populate('orders').exec();
};

exports.createOrderItem = function (productID, orderID, amount) {
    return OrderItem.create({
        productID,
        orderID,
        amount
    });
};

exports.getOrderItem = function (orderItemID) {
    return OrderItem.findById(orderItemID).exec();
};

exports.getOrderItem = function () {
    return OrderItem.find().populate('orderItems').exec();
};

async function main() {
    try {
        await createProduct();
        // console.log(preProducts)
        // console.log(preUsers)
        // console.log(preOrders)
        // console.log(preOrederItems)

    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();
