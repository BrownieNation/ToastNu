const express = require('express');
const app = express();
const config = require('./config');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(require('./routes/orderItems'));
app.use(require('./routes/orders'));
app.use(require('./routes/products'));
app.use(require('./routes/users'))
const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test


