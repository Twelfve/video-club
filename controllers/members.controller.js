const express = require('express');
const Member = require('../models/member.model');



async function create(req,res,next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;


    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    });

    member.save().then(obj => res.status(200).json({
        msg: res.__('member.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('member.fail'),
        obj: ex
    }));
}

function list(req,res,next){
    Member.find().then(objs => res.status(200).json({
        msg: res.__('member.list'),
        obj: objs
    })).catch(ex => res.status(500).json({
        msj: res.__('member.fail_list'),
        obj: ex
    }));
}

function index(req,res,next){

}

function replace(req,res,next){

}

function update(req,res,next){

}

function destroy(req,res,next){

}

module.exports = {create, list, index, replace, update, destroy};