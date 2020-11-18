const express = require('express');
const app = express();
const config = require('./config');
const controller = require('./controller/controller');
// const User = require('../model/userSchema');
// const Product = require('../model/productSchema');
// const Order = require('../model/orderSchema');
// const OrderItem = require("../model/orderItemSchema");


app.use(express.static(__dirname + '/public/html'));
app.use(express.json());
app.use(require('./routes/orderItems'));
app.use(require('./routes/orders'));
app.use(require('./routes/products'));
app.use(require('./routes/users'))
const port = process.env.PORT || config.localPort;
app.listen(port);   
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test


