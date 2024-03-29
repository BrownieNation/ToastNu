const mongoose = require('mongoose');
const config = require('../config');
const Admin = require('../model/adminSchema');
const User = require('../model/userSchema');
const Product = require('../model/productSchema');
const Order = require('../model/orderSchema');
const CompletedOrder = require('../model/completedOrderSchema');
const OrderItem = require("../model/orderItemSchema");
const bcrypt = require('bcryptjs');

// const fs= require('fs');



// const preUsers = require('../user');
// const preOrders = require('../order');
// const preOrederItems = require('../orderItem');


mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

// ----------------------------------------------------------------------
// CRUD
// TIL
// USERS:
// ----------------------------------------------------------------------


exports.createUser =  async function (_userID, name, password, phoneNumber, isAdmin,loggedIn) {
    // const hashedPassword = await bcrypt.hash(password,8)
   
    return User.create({
        _userID,
        name, 
        password,
        phoneNumber,
        isAdmin,
        loggedIn
    }
    );
}

// exports.verifyPassword = async function(hashedPassword, password){
// const isMatch = await bcrypt.compare(hashedPassword, password)

// return isMatch
// };

exports.getUser = function (_userId) {
    return User.findById(_userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('users').exec();
};

exports.deleteUser = async function (_userID) {
    return await User.deleteOne().where('_userID').eq(_userID).exec();
};
exports.userLogin= async function(_userID,val)
{
    return User.findOneAndUpdate({"_userID": _userID},{"loggedIn": val}).exec();
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



exports.createProduct = function (_productID, productName, productDescription, productPrice,productImage,productCategory) {
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
exports.deleteProduct = async function(productID)
{
    return await Product.deleteOne().where('_productID').eq(productID).exec();
}

// ----------------------------------------------------------------------
// CRUD
// TIL
// ORDERS
// ----------------------------------------------------------------------

exports.createOrder = function (orderNumber, date, userID, products) {
 
    return Order.create({
        orderNumber,
        date,
        userID,
        products
    });
};
exports.createCompletedOrder = function (orderNumber, date, userID, products) {
 
    return CompletedOrder.create({
        orderNumber,
        date,
        userID,
        products
    });
};

exports.getOrder = async function (orderID) {
    return Order.findById(orderID).exec();
};

exports.getOrders = function () {
    return Order.find().populate('orders').exec();
};
exports.getcompletedOrders = function () {
    return CompletedOrder.find().populate('orders').exec();
};

exports.deleteOrder = function (order) {
    return  Order.deleteOne().where('_id').eq(order._id).exec();
};
exports.moveOrder = async function (orderID)
{  console.log(orderID);
    let order= await exports.getOrder(orderID);
    // console.log(order);
    exports.deleteOrder(order);
    exports.createCompletedOrder(order.orderNumber,order.date,order.userID,order.products);


}

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



// User.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ _userID })    

//     if (!user) {
//         throw new error ('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user

// }

// User.pre('save', async function (next) {
//     const user = this

//     console.log('Something magical is happening, JK password encrypted')

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })
// ----------------------------------------------------------------------
// MAIN:
// ----------------------------------------------------------------------

// async function main() {
//     try {
//         // createProduct();
//         console.log(preProducts)

//     } catch (e) {
//         console.log(e.name + ": " + e.message);
//     }
// }
// main();
