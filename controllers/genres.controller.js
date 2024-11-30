const express = require('express');
const Genre = require('../models/genre.model');

function create(req, res, next) {
    const description = req.body.description;
    

    let genre = new Genre({
        description: description
    });
    genre.save().then(obj => res.status(200).json({
        msg: res.__('genre.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('genre.fail'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Genre.paginate({},options).then(objs => res.status(200).json({
        msj: res.__('genre.list'),
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('genre.fail_list'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        msj: `genre con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genre.fail_index'),
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let description = req.body.description ? req.body.description : ""; 
    

    let genre = new Object({
        _description : description
    });
    
    Genre.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
        msj: res.__('genre.replace'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genre.fail_replace'),
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    let description = req.body.description;

    let genre = new Object();
    if(description) genre._description = description;
    

    Genre.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
        msj: res.__('genre.update'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genre.fail_update'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Genre.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msj: res.__('genre.destroy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('genre.fail_destroy'),
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};