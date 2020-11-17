// toastnu.js
const controller = require("../controller/controller");
const express = require('express');
//const { request } = require("../app");
const router = express.Router();



router
    //get
    //orders
    .get('/api/orders', async (request, response) => {
        try {
            let orders = await controller.getOrders;
            response.send(orders);
        } catch (e) {
            sendStatus(e, orders);
        }
    })


    //post
    //orders
    .post('/api/orders', async (request, response) => {
        try {
            let {_orderID, date, userID,  orderItems } = request.body;
            await controller.createOrder(_orderID, date, userID,  orderItems);
            response.send({ message: 'Order created' });

        } catch (e) {
            sendStatus(e, response);
        }
    }
    );


function sendStatus(e, response) {
        console.error("Exception: " + e);
        if (e.stack) console.error(e.stack);
        response.status(500).send(e);
}
    
module.exports = router;