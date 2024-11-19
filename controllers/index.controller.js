const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require('config');

function home(req, res, next) {
  res.render("index", { title: "Express" });
}

function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const jwtKey = config.get('secret.key');

  User.findOne({ _email: email }).then((user) => {
    if (user) {
      bcrypt.hash(password, user.salt, (err, hash) => {
        if (err) {
          res.status(401).json({
            msg: res.__('login.fail'),
            obj: null,
          });
        }

        if (hash === user.password) {
          res.status(200).json({
            msg: res.__('login.ok'),
            obj: jwt.sign(
              {
                data: user.id,
                exp: Math.floor(Date.now() / 1000) + 180,
              },
              jwtKey
            ),
          });
        } else {
          res.status(401).json({
            msg: "Usuario y/o contraseña incorrectos",
            obj: null,
          });
        }
      });
    } else {
      res.status(401).json({
        msg: "Usuario y/o contraseña incorrectos",
        obj: null,
      });
    }
  });
}

module.exports = {
  home,
  login,
};