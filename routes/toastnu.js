// toastnu.js
const controller = require("../controller/controller");
const express = require('express');
//const { request } = require("../app");
const router = express.Router();

router
    .get('/api/products', async (request, response) => {
        try {
            let products = await controller.getProducts;
            response.send(products);
        } catch (e) {
            sendStatus(e, products);
        }
    })

    .post('/api/products', async (request, response) => {
        try {
            let {_productID, productName, productDescription,  productPrice, orderItems } = request.body;
            await controller.createProduct(_productID, productName, productDescription,  productPrice, orderItems);
            response.send({ message: 'Product created' });

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