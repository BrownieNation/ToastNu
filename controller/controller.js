const mongoose = require('mongoose');
const config = require('../config');

const User = require('../model/schema');
const Product = require('../model/schema');
const Order = require('../model/schema');
const OrderItem = require('../model/schema');
const preProducts = require('../product');


mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });


async function createUser() {
    for (u of User.users) {
        await User.create({
            name: u.name,
            password: u.password,
            phoneNumber: u.phoneNumber
        });
    }
}

exports.getUser = function (userId) {
    return User.findById(userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('user').exec();
};

async function createProduct() {
    for (p of preProducts.Produkter) {
        await Product.create({
            productID: p.productID,
            productName: p.productName,
            productDescription: p.productDescription,
            productPrice: p.productPrice
        });
    }
}

exports.createProduct = function (productID, productName, productDescription, productPrice) {
    return Product.create({
        productID,
        productName,
        productDescription,
        productPrice
    });
};

exports.getProduct = function (productID) {
    return Product.findById(productID).exec();
};

exports.getProducts = function () {
    return Product.find().populate('product').exec();
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
    return Product.find().populate('Order').exec();
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
    return OrderItem.find().populate('orderItem').exec();
};

// async function main() {
//     try {
//         createProduct();

//     } catch (e) {
//         console.log(e.name + ": " + e.message);
//     }
// }
// main();