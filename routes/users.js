// toastnu.js
const express = require('express');
const router = express.Router();
const controller = require("../controller/controller");
const User = require('../model/userSchema')


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
    })


    .post('/users/login', async (request, response) => {
        try {
            const user = await User.findByCredentials(request.body._userID, request.body.password)
            response.send(user)
        } catch (e){
            response.status(400).send()
        }
    });



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

    router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'password', 'phoneNumber']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            const user = await User.findById(req.params._id)
    
            updates.forEach((update) => user[update] = req.body[update])
            await user.save()
    
            if (!user) {
                return res.status(404).send()
            }
    
            res.send(user)
        } catch (e) {
            res.status(400).send(e)
        }
    })
  
    router.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params._id)
    
            if (!user) {
                return res.status(404).send()
            }
    
            res.send(user)
        } catch (e) {
            res.status(500).send()
        }
    })


module.exports = router;