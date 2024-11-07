const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

function home(req, res, next) {
    res.render('index', { title: 'Express' });
}

function login(req, res, next) {
    
    const { email, password } = req.body;

    User.findOne({ "_email": email }).then((user) => {
        if (user) {
            bcrypt.hash(password, user.salt, function(err, hash) {
                if(err){
                    res.status(403).json({
                        msg: 'Login failed',
                        data: 'Invalid credentials'
                    })
                }
                if (hash === user.password) {
                    res.status(200).json({
                        msg: 'Login success',
                        data: user
                    });
                } else {
                    res.status(401).json({
                        msg: 'Login failed',
                        data: 'Invalid credentials'
                    });
                }
            });

            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    res.status(200).json({
                        msg: 'Login success',
                        data: user
                    });
                } else {
                    res.status(401).json({
                        msg: 'Login failed',
                        data: 'Invalid credentials'
                    });
                }
            });
        } else {
            res.status(401).json({
                msg: 'Login failed',
                data: 'Invalid credentials'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            msg: 'Error login',
            data: error
        });
    });

}

module.exports = {
    home,
    login
};