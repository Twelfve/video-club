const express = require('express');
const Movie = require('../models/movie.model');
const Director = require('../models/director.model');

async function create(req, res, next) {
    const { title, directorId } = req.body;

    const director

    const director = new Director({ name, lastName });
    director.save()
        .then((obj) => {
            res.status(200).json({
                msg: 'Director created',
                data: obj
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Error creating director',
                data: error
            });
        });
}
function list(req, res, next) {
    Director.find()
        .then((directors) => {
            res.status(200).json({
                msg: 'Directors list',
                data: directors
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: 'Error listing directors',
                data: error
            });
        });
}
function index(req, res, next) {
    const { id } = req.params;
    Director.findOne({ _id: id })
        .then((director) => {
            res.status(200).json({
                msg: `Director with id ${id}`,
                data: director
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: `Error getting director with id ${id}`,
                data: error
            });
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    const { name, lastName } = req.body

    let director = new Object();
    name ? director._name = name : '';
    lastName ? director._lastName = lastName : '';

    Director.findOneAndReplace({ _id: id }, director).then((director) => {
        res.status(200).json({
            msg: `Director with id ${id} replaced`,
            data: director
        });
    }
    ).catch((error) => {
        res.status(500).json({
            msg: `Error replacing director with id ${id}`,
            data: error
        });
    });
}
function update(req, res, next) {
    const { id } = req.params;
    const { name, lastName } = req.body

    let director = new Object();
    if (name) director._name = name;
    if (lastName) director._lastName = lastName;

    Director.findOneAndUpdate({ _id: id }, director).then((director) => {
        res.status(200).json({
            msg: `Director with id ${id} updated`,
            data: director
        });
    }
    ).catch((error) => {
        res.status(500).json({
            msg: `Error updating director with id ${id}`,
            data: error
        });
    });

}
function destroy(req, res, next) {
    const { id } = req.params;
    Director.findOneAndDelete({ _id: id })
        .then((director) => {
            res.status(200).json({
                msg: `Director with id ${id} deleted`,
                data: director
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: `Error deleting director with id ${id}`,
                data: error
            });
        });
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
};
