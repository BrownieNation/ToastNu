// toastnu.js
const controller = require("../controller/controller");
const express = require('express');
//const { request } = require("../app");
const router = express.Router();



router
    //get
    //products
    .get('/api/products', async (request, response) => {
        try {
            let products = await controller.getProducts;
            response.send(products);
        } catch (e) {
            sendStatus(e, products);
        }
    })

    //users
    .get('/api/users', async (request, response) => {
        try {
            let users = await controller.getUsers;
            response.send(users);
        } catch (e) {
            sendStatus(e, users);
        }
    })

    //orders
    .get('/api/orders', async (request, response) => {
        try {
            let orders = await controller.getOrders;
            response.send(orders);
        } catch (e) {
            sendStatus(e, orders);
        }
    })

    .get('/api/orderItems', async (request, response) => {
        try {
            let ordersItems = await controller.getOrderItem;
            response.send(ordersItems);
        } catch (e) {
            sendStatus(e, ordersItems);
        }
    })



    //post
    //products
    .post('/api/products', async (request, response) => {
        try {
            let {_productID, productName, productDescription,  productPrice, orderItems } = request.body;
            await controller.createProduct(_productID, productName, productDescription,  productPrice, orderItems);
            response.send({ message: 'Product created' });

        } catch (e) {
            sendStatus(e, response);
        }
    }
    )
    //users
    .post('/api/users', async (request, response) => {
        try {
            let {_userID, name, password,  phoneNumber, orders } = request.body;
            await controller.createUser(_userID, name, password,  phoneNumber, orders);
            response.send({ message: 'User created' });

        } catch (e) {
            sendStatus(e, response);
        }
    }
    )

    .post('/api/orders', async (request, response) => {
        try {
            let {_orderID, date, userID,  orderItems } = request.body;
            await controller.createOrder(_orderID, date, userID,  orderItems);
            response.send({ message: 'Order created' });

        } catch (e) {
            sendStatus(e, response);
        }
    }
    )

    .post('/api/orderItems', async (request, response) => {
        try {
            let {_orderItemID, productID, orderID,  amount } = request.body;
            await controller.createOrderItem(_orderItemID, productID, orderID,  amount );
            response.send({ message: 'OrderItem created' });

        } catch (e) {
            sendStatus(e, response);
        }
    }
    )
    
    
    
    ;




function sendStatus(e, response) {
        console.error("Exception: " + e);
        if (e.stack) console.error(e.stack);
        response.status(500).send(e);
}
    
module.exports = router;