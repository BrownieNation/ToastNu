// products.js
const express = require('express');
const Products = require("../model/productSchema");
const router = express.Router();
const controller = require("../controller/controller");

router
    //post
    //products
    .post('/products', async (request, response) => {
        const product = new Products(request.body)
        try {
            await product.save()
            response.status(201).send(product);

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )

    //get
    //products
    .get('/products', async (request, response) => {
        try {
<<<<<<< HEAD
           
            const products = await Products.find()
=======
            const products = await controller.getProducts();
>>>>>>> 983231a6cf755570e9e551f38872b7e6c10f08ac
            if(!products){
                return response.status(404).send()
            }
            response.status(200).send(products);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

/* .delete('/:productID', async (request, response) => {
    try {
        await controller.deleteOrder(request.params.orderID)
        response.send({message: 'Product deleted'});
    } catch (e) {
        response.status(500).send(e.message);
    }
}) */;

    
module.exports = router;