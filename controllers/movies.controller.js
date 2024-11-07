const express = require("express");
const Movie = require("../models/movie");
const Director = require("../models/director");

async function create(req, res, next) {
    const { title, directorId } = req.body;

    const director = await Director.findOne({ _id: directorId });

    let movie = new Movie({
        title: title,
        director: director,
    });

    movie
        .save()
        .then((obj) =>
        res.status(200).json({
            msg: ⁠ Pelicula almacenada completamente ⁠,
            obj: obj,
        })
        )
        .catch((ex) =>
        res.status(500).json({
            msg: ⁠ Fallo al almacenar la pelicula ⁠,
            obj: ex,
        })
        );
}
function list(req, res, next) {
    Movie.find()
        .populate("_director")
        .then((objs) =>
        res.status(200).json({
            msg: "Peliculas consultados correctamente",
            obj: objs,
        })
        )
        .catch((exception) =>
        res.status(500).json({
            msg: "Fallo al consultar peliculas",
            obj: exception,
        })
        );
}
function index(req, res, next) {}
function replace(req, res, next) {}
function update(req, res, next) {}
function destroy(req, res, next) {}
module.exports = {
  create,
  list,
  index,
  replace,
  update,
  destroy,
};