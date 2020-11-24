// toastnu.js
const express = require('express');
const Users = require("../model/userSchema");
const router = express.Router();
const controller = require('../controller/controller');


    //get
    //users
    router.post('/users', async (request, response) => {
        
        // const user = new Users(request.body)
        
        try {
            let {_userID, name, password, phooneNumber} = request.body;
            await controller.createUser(_userID, name, password, phooneNumber);
            // await user.save();
            response.status(201).send(user);

        } catch (e) {
            response.status(500).send(e.message);
        }
    }
    )

    //fra joke
    // .post('/api/jokes', async (request, response) => {
    //     try {
    //         let { setup, punchline } = request.body;
    //         await controller.createJoke(setup, punchline);
    //         response.send({ message: 'Joke saved!' });

    //     } catch (e) {
    //         sendStatus(e, response);
    //     }

    // })

    //get
    //products
    router.get('/users', async (request, response) => {
        try {
            const users = await Users.find()
            if (!users) {
                return response.status(404).send()
            }
            response.status(200).send(users);
        } catch (e) {
            response.status(400).send(e.message)
        }
    })

    


module.exports = router;