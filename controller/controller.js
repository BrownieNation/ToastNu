const mongoose = require('mongoose');
const User = import('../model/user');
const config = require('../config');
const Product = import('../model/product');
const Order = import('../model/order');
const OrderItem = import('../model/orderItems');

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
    for (p of Product.products) {
        await Product.create({
            productName: p.productName,
            productDescription: p.productDescription,
            productPrice: p.productPrice,
            catogory: p.catogory
        });
    }
}

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

exports.getOrder = function (_userOrderID) {
    return Product.findById(_userOrderID).exec();
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

exports.getOrderItem = function (orderItemID) {
    return OrderItem.findById(orderItemID).exec();
};

exports.getOrderItem = function () {
    return OrderItem.find().populate('orderItem').exec();
};

async function main() {
    try {
        createProduct();

    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();