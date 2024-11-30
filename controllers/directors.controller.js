const express = require('express');
const Director = require('../models/director.model');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name,
        lastName: lastName
    });
    director.save().then(obj => res.status(200).json({
        msg: res.__('director.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('director.fail'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Director.paginate({},options).then(objs => res.status(200).json({
        msj: res.__('director.list'),
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('director.fail_list'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        msj: `Director con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('director.fail_index'),
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : ""; 
    let lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
        _name: name,
        _lastName: lastName
    });
    
    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        msj: res.__('director.replace'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('director.fail_replace'),
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();
    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
        msj: res.__('director.update'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('director.fail_update'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msj: res.__('director.destroy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('director.fail_destroy'),
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};