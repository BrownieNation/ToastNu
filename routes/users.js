// toastnu.js
const express = require('express');
// const app = express();
const router = express.Router();
const controller = require('../controller/controller');


    //post
    //users
    router.post('/users', async (request, response) => {
        
        try {
           
            let {_userID, name, password, phoneNumber} = request.body;
            console.log("Jeg er i postUsers");
            await controller.createUser(_userID, name, password, phoneNumber);
            response.send({message:"User Saved"});
          
            
        } catch (e) {
            
            response.status(500).send(e.message);
        }
    }
    )

   

    //get
    //users
    router.get('/users', async (request, response) => {
        try {
            
            const users = await controller.getUsers();
            if (!users) {
                return response.status(404).send()
            }
            response.status(200).send(users);
        } catch (e) {
            response.status(400).send(e.message)
        }
    });

    


module.exports = router;