// toastnu.js
const express = require('express');
const Users = require("../model/userSchema");
const router = express.Router();

router
    //get
    //users
    .post('/users', async (request, response) => {
        const user = new Users(request.body)
        try {
            await user.save()
            response.status(201).send(user);

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )

    //get
    //products
    .get('/users', async (request, response) => {
        try {
            const users = await Users.find()
            if(!users){
                return response.status(404).send()
            }
            response.status(200).send(users);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

    
module.exports = router;