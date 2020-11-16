const mongoose = require('mongoose');
const User = require('../model/user');
const config = require('../config');
const Product = require('../model/product');
const Order = require('../model/order');
const OrderItem = require('../model/orderItems');

mongoose.connect(config.databaseURI,
    { useNewUrlParser: true, useUnifiedTopology: true });

exports.createUser = function (name, password) {
    return User.create({
        name,
        password
    });
};

exports.getUser = function (userId) {
    return User.findById(userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('user').exec();
};

exports.createProduct = function (productName, productDescription,  productPrice) {
    return Product.create({
        productName,
        productDescription,
        productPrice
    });
};

exports.getProduct = function (productID ) {
    return Product.findById(productID ).exec();
};

exports.getProducts = function () {
    return Product.find().populate('product').exec();
};

exports.createOrder = function (userID) {
    return Order.create({
            userID
    });
};

exports.getOrder = function (_userOrderID ) {
    return Product.findById(_userOrderID ).exec();
};

exports.getOrders = function () {
    return Product.find().populate('Order').exec();
};

exports.createOrderItem = function (productID, userOrderID, amount) {
    return OrderItem.create({
        productID,
        userOrderID,
        amount
    });
};

exports.getOrderItem = function (orderItemID  ) {
    return OrderItem.findById(orderItemID ).exec();
};

exports.getOrderItem = function () {
    return OrderItem.find().populate('orderItem').exec();
};

async function main() {
    try {
        Product.create(productName, productDescription,  productPrice);
        
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();