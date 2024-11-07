const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');


async function create(req, res, next) {
    const { name, lastName, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        lastName,
        email,
        password: hash,
        salt
    });

    user.save()
        .then((obj) => {
            res.status(200).json({
                msg: 'User created',
                data: obj
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Error creating user',
                data: error
            });
        });

}
function list(req, res, next) {
    res.send('GET  => /users/');
}
function index(req, res, next) {
    res.send('GET  => /users/:id');
}
function replace(req, res, next) {
    res.send('PUT  => /users/:id');
}
function update(req, res, next) {
    res.send('PATCH  => /users/:id');
}
function destroy(req, res, next) {
    res.send('DELETE  => /users/:id');
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
};
