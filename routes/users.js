// toastnu.js
const controller = require("../controller/controller");
const express = require('express');
//const { request } = require("../app");
const router = express.Router();

router
    //get
    //users
    .get('/api/users', async (request, response) => {
        try {
            let users = await controller.getUsers;
            response.send(users);
        } catch (e) {
            sendStatus(e, users);
        }
    })

    //post
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
    );


function sendStatus(e, response) {
        console.error("Exception: " + e);
        if (e.stack) console.error(e.stack);
        response.status(500).send(e);
}
    
module.exports = router;