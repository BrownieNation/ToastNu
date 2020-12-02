// products.js
const express = require('express');
const Products = require("../model/productSchema");
const router = express.Router();
const controller = require("../controller/controller");

router
    //post
    //products
    .post('/products', async (request, response) => {
       
        try {
            let {id,productName,beskrivelse,pris,img,category} = request.body
            console.log(id,productName,beskrivelse,pris,img,category);
            await controller.createProduct(id,productName,beskrivelse,pris,img,category);
            response.send({message:"Product saved"});

        } catch (e) {
            console.log(e.message);
            response.status(500).send(e.message);
        }
    }
    )

    //get
    //products
    .get('/products', async (request, response) => {
        try {

            const products = await controller.getProducts();

            if(!products){
                return response.status(404).send()
            }
            response.status(200).send(products);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

    .delete('/products', async (request, response) => {
    try {
        console.log("hej");
        let productID= request.body;
        console.log(productID);
        await controller.deleteOrder(productID);
        response.send({message: 'Product deleted'});
    } catch (e) {
        response.status(500).send(e.message);
    }
}) ;

    
module.exports = router;