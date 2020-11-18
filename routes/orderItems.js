// toastnu.js
const express = require('express');
const OrderItems = require("../model/orderItemSchema");
const router = new express.Router();

router
    //post
    //orderItems
    .post('/orderItems', async (request, response) => {
        const orderItem = new OrderItems(request.body)
        try {
            await orderItem.save()
            response.status(201).send(orderItem);

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )

    //get
    //orderItems
    .get('/orderItems', async (request, response) => {
        try {
            const orderItems = await OrderItems.find()
            if(!orderItems){
                return response.status(404).send()
            }
            response.status(200).send(orderItems);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

    
module.exports = router;