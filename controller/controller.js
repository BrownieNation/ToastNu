const mongoose = require('mongoose');
const config = require('../config');
const Admin = require('../model/adminSchema');
const User = require('../model/userSchema');
const Product = require('../model/productSchema');
const Order = require('../model/orderSchema');
const OrderItem = require("../model/orderItemSchema");
let preProducts = require('../product');

// const preUsers = require('../user');
// const preOrders = require('../order');
// const preOrederItems = require('../orderItem');


mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

// ----------------------------------------------------------------------
// CRUD
// TIL
// USERS:
// ----------------------------------------------------------------------

async function createUser() {
    for (u of User.users) {
        await User.create({
            _userID : u._userID,
            name: u.name,
            password: u.password,
            phoneNumber: u.phoneNumber
        });
    }
}

exports.createUser = function (_userID, name, password, phoneNumber) {
    return User.create({
        _userID, name, password, phoneNumber
    }
    )
}

exports.getUser = function (_userId) {
    return User.findById(_userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('users').exec();
};

// ----------------------------------------------------------------------
// CRUD
// TIL
// ADMINS:
// ----------------------------------------------------------------------

async function createAdmin(name, password, phoneNumber) {
    // for (a of Admin.admins) {
    await Admin.create({
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        isEmployee: true
    });
    // }
}

exports.getAdmin = function (_Id) {
    return Admin.findById(_Id).exec();
};

exports.getAdmins = function () {
    return Admin.find().populate('admins').exec();
};

// ----------------------------------------------------------------------
// CRUD
// TIL
// PRODUCTS:
// ----------------------------------------------------------------------

// async function createProduct() {

//     for (p of preProducts.Produkter) {
//         await Product.create({
//             productID: p.productID,
//             productName: p.productName,
//             productDescription: p.productDescription,
//             productPrice: p.productPrice,
//         });
//     }
// };

exports.createProduct = function (productName, productDescription, productPrice) {
    return Product.create({
        productName,
        productDescription,
        productPrice,
        productImage,
        productCategory
    });
};

exports.createProduct = function (_productID, productName, productDescription, productPrice) {
    return Product.create({
        _productID,
        productName,
        productDescription,
        productPrice,
        productImage,
        productCategory
    });
};

exports.getProduct = function (productID) {
    return Product.findById(productID).exec();
};

exports.getProducts = function () {
    return Product.find().populate('products').exec();
};

// ----------------------------------------------------------------------
// CRUD
// TIL
// ORDERS
// ----------------------------------------------------------------------

exports.createOrder = function (date, userID, products) {
    return Order.create({
        date,
        userID,
        products
    });
};

exports.getOrder = function (_orderID) {
    return Product.findById(_orderID).exec();
};

exports.getOrders = function () {
    return Product.find().populate('orders').exec();
};

exports.deleteOrder = async function (orderID) {
    return await Order.deleteOne().where('_id').eq(order._id).exec()
};

// ----------------------------------------------------------------------
// CRUD
// TIL
// ORDERITEMS:
// ----------------------------------------------------------------------

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

exports.getOrderItems = function () {
    return OrderItem.find().populate('OrderItems').exec();
};

// ----------------------------------------------------------------------
// MAIN:
// ----------------------------------------------------------------------

async function main() {
    try {
        // createProduct();
        console.log(preProducts)

    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}
main();
