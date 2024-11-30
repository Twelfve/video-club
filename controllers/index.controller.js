const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function home(req, res, next){
    res.render('index', { title: 'Express' });
}

function login(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    const jwtkey = config.get('secret.key');
    User.findOne({"_email": email}).then(user => {
        if(user){
            bcrypt.hash(password,user.salt,(err, hash) => {
                if(err){
                    res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }

                if(hash === user.password){
                    res.status(200).json({
                        msg: res.__('login.ok'),
                        obj: jwt.sign({
                            data: user.id,
                            exp: Math.floor(Date.now()/1000) + 180},jwtkey)
                    });
                }else{
                    res.status(403).json({
                        msg: res.__('login.fail'),
                        obj: null
                    });
                }
            });
        }else{
            res.status(403).json({
                msg: res.__('login.fail'),
                obj: null
            });
        }
    }).catch();
}

module.exports = {home, login}