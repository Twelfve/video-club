const express = require('express');
const Actor = require('../models/actor.model');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });
    actor.save().then(obj => res.status(200).json({
        msg: res.__('actor.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('actor.fail'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Actor.paginate({},options).then(objs => res.status(200).json({
        msj: res.__('actor.list'),
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('actor.fail_list'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        msj: `Actor con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actor.fail_index'),
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : ""; 
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name: name,
        _lastName: lastName
    });
    
    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
        msj: res.__('actor.replace'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actor.fail_replace'),
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();
    if(name) actor._name = name;
    if(lastName) actor._lastName = lastName;

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
        msj: res.__('actor.update'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actor.fail_update'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msj: res.__('actor.destroy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('actor.fail_destroy'),
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};