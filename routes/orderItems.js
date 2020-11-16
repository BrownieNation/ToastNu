// toastnu.js
const controller = require("../controller/controller");
const express = require('express');
//const { request } = require("../app");
const router = express.Router();



router
    //get
    //orderItems
    .get('/api/orderItems', async (request, response) => {
        try {
            let ordersItems = await controller.getOrderItem;
            response.send(ordersItems);
        } catch (e) {
            sendStatus(e, ordersItems);
        }
    })

    //post
    //orderItems
    .post('/api/orderItems', async (request, response) => {
        try {
            let {_orderItemID, productID, orderID,  amount } = request.body;
            await controller.createOrderItem(_orderItemID, productID, orderID,  amount );
            response.send({ message: 'OrderItem created' });

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