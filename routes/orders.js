// orders.js
const express = require('express');
const Orders = require("../model/orderSchema");
const router = express.Router();
const controller = require('../controller/controller');

router
    //post
    //orders
    .post('/orders', async (request, response) => {
      
        try {
            let {date, userID, products} = request.body;
            await controller.createOrder(date, userID, products);
            
            response.send({message:"order sent"});

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )
    // .post('/users', async (request, response) => {
        
    //     try {
           
    //         let {_userID, name, password, phoneNumber} = request.body;
    //         await controller.createUser(_userID, name, password, phoneNumber);
    //         response.send({message:"User Saved"});
          
            
    //     } catch (e) {
            
    //         response.status(500).send(e.message);
    //     }
    // });

    //get
    //orders
    .get('/orders', async (request, response) => {
        try {

            const products = await controller.getOrders();

            if(!products){
                return response.status(404).send()
            }
            response.status(200).send(products);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })
    .move('/orders/:orderID', async (request, response) => {
        try {
            await controller.moveOrder(request.params.orderID)
            response.send({ message: 'Order moved' });
        } catch (e) {
            console.log(e.message);
            response.status(500).send(e.message);
        }
    })
    .get('/completedorders', async (request, response) => {
        try {

            const products = await controller.getcompletedOrders();

            if(!products){
                return response.status(404).send()
            }
            response.status(200).send(products);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })
    //delete
    //orders
    .delete('/orders/:orderID', async (request, response) => {
    try {
        await controller.deleteOrder(request.params.orderID)
        response.send({ message: 'Order deleted' });
    } catch (e) {
        response.status(500).send(e.message);
    }
});

    
module.exports = router;