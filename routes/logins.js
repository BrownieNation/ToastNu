// const controller = require("../controller/controller");
// const express = require('express');
// const router = express.Router();


// router
//     .get('/login', async (request, response) => {
//         try {
//             let orders = await controller.getOrders();
//             response.send(orders);
//         } catch (e) {
//             sendStatus(e, response);
//         }
//     })

//     .post('/login', async (request, response) => {
//         const { userID, password } = request.body;
//         let user = controller.getUser(userID)
//         if (password === user.password && userID) {
//             request.session.navn = navn;
//             response.status(201).send(['login succesful']);
//         } else {
//             response.sendStatus(401);
//         }
//     });

//     module.exports = router;