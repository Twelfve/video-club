const express = require('express');
const { Copy } = require('../classes/db');

function create(req, res, next) {
    const { number, format, movieId, status } = req.body;

    Copy.create({
        number,
        format,
        movieId,
        status
    })
        .then(copy => {
            res.json(copy);
        })
        .catch(err => {
            res.status(400).json(err);
        });

}
function list(req, res, next) {
    Copy.findAll({include: ['movie']})
        .then(copy => {
            res.json(copy);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function index(req, res, next) {
    const { id } = req.params;
    Copy.findByPk(id)
        .then(copy => {
            if (!copy) {
                return res.status(404).json({ message: 'Copy not found' });
            }
            res.json(copy);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
function replace(req, res, next) {
    const { id } = req.params;
    Copy.findByPk(id).then(copy => {
        if (!copy) {
            return res.status(404).json({ message: 'Copy not found' });
        }
        const { number, format, movieId, status } = req.body;
        copy.number = number;
        copy.format = format;
        copy.movieId = movieId;
        copy.status = status;
        copy.save()
            .then(copy => {
                res.json(copy);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });    
}
function update(req, res, next) {
    const { id } = req.params;
    Copy.findByPk(id).then(copy => {
        if (!copy) {
            return res.status(404).json({ message: 'Copy not found' });
        }
        const { number, format, movieId, status } = req.body;
        copy.number = number || copy.number;
        copy.format = format || copy.format;
        copy.movieId = movieId || copy.movieId;
        copy.status = status || copy.status;
        copy.save()
            .then(copy => {
                res.json(copy);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
}
function destroy(req, res, next) {
    const { id } = req.params;
    Copy.destroy({
        where: {
            id
        }
    })
        .then(() => {
            res.json({ message: 'Copy deleted' });
        })
        .catch(err => {
            res.status(400).json(err);
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
