const express = require('express');
const Copy = require('../models/copy.model');
const Movie = require('../models/movie.model');

async function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie = await Movie.findOne({"_id":movieId});
    let copy = new Copy({
        number: number,
        format:format,
        movie:movie,
        status:status
    });
    copy.save().then(obj => res.status(200).json({
        msg: res.__('copy.ok'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msj: res.__('copy.fail'),
        obj: ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;
    const options = {
        page: page,
        limit: 5
    };
    Copy.paginate({},options).then(objs => res.status(200).json({
        msj: res.__('copy.list'),
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: res.__('copy.fail_list'),
        obj: ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({"_id":id}).then(obj => res.status(200).json({
        msj: `copy con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copy.fail_index'),
        obj: ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let number = req.body.number ? req.body.number : ""; 
    let format = req.body.format ? req.body.format : "";
    let movieId = req.body.movieId ? req.body.movieId : "";
    let status = req.body.status ? req.body.status : "";

    let copy = new Object({
        _number: number,
        _format: format,
        _movieId: movieId,
        _status: status
    });
    
    Copy.findOneAndUpdate({"_id":id}, copy).then(obj => res.status(200).json({
        msj: res.__('copy.replace'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copy.fail_replace'),
        obj: ex
    }));
}

function update(req, res, next) {
    const id = req.params.id;
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let copy = new Object();
    if(number) copy._number = number;
    if(movieId) copy._movieId = movieId;
    if(format) copy._format = format;
    if(status) copy._status = status;

    Copy.findOneAndUpdate({"_id":id}, copy).then(obj => res.status(200).json({
        msj: res.__('copy.update'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copy.fail_update'),
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.findOneAndDelete({"_id":id}).then(obj => res.status(200).json({
        msj: res.__('copy.destroy'),
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: res.__('copy.fail_destroy'),
        obj: ex
    }));
}

module.exports = {create, list, index, replace, update, destroy};