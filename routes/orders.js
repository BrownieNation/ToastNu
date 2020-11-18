// toastnu.js
const express = require('express');
const Orders = require("../model/orderSchema");
const router = express.Router();

router
    //post
    //orderItems
    .post('/orders', async (request, response) => {
        const order = new Orders(request.body)
        try {
            await order.save()
            response.status(201).send(order);

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )

    //get
    //orderItems
    .get('/orders', async (request, response) => {
        try {
            const orders = await Orders.find()
            if(!orders){
                return response.status(404).send()
            }
            response.status(200).send(orders);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

    
module.exports = router;