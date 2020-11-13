const mongoose = require('mongoose');
const User = require('../model/user');
const config = require('../config');

mongoose.connect(config.databaseURI,
    {useNewUrlParser: true, useUnifiedTopology: true});

exports.createUser = function (name, password) {
    return User.create({
        name,
        password
    });
};

exports.getUser = function (userId) {
    return User.findById(userId).exec();
};

exports.getUsers = function () {
    return User.find().populate('user').exec();
};