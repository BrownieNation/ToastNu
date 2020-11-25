// toastnu.js
const express = require('express');
<<<<<<< HEAD
// const app = express();
=======
>>>>>>> 983231a6cf755570e9e551f38872b7e6c10f08ac
const router = express.Router();
const controller = require("../controller/controller");
const User = require("../model/userSchema");


    //post
    //users
    router

    .post('/users', async (request, response) => {
        
        try {
           
            let {_userID, name, password, phoneNumber} = request.body;
            await controller.createUser(_userID, name, password, phoneNumber);
            response.send({message:"User Saved"});
          
            
        } catch (e) {
            
            response.status(500).send(e.message);
        }
    });



    //get
    //users
    router.get('/users', async (request, response) => {
        try {
<<<<<<< HEAD
            
=======
            console.log(" er i Users");
>>>>>>> 983231a6cf755570e9e551f38872b7e6c10f08ac
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