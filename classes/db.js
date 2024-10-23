const Sequelize = require('sequelize');

const directorModel = require('../models/director.model');
const genreModel = require('../models/genre.model');
const movieModel = require('../models/movie.model');
const actorModel = require('../models/actor.model');
const movieActorModel = require('../models/movieActor.model');
const copyModel = require('../models/copy.model');
const memberModel = require('../models/member.model');
const bookingModel = require('../models/booking.model');

/*
    1) Nombre de la base de datos
    2) Usuario
    3) Contraseña
    4) Objeto de configuración <<ORM>>
*/

const sequelize = new Sequelize('video-club', 'root', 'gigabyteb250', {
    host: 'localhost',
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);

// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, { as: 'movies' });

// Una pelicula tiene un genero
Movie.belongsTo(Genre, { as: 'genre' });

// Un director puede participar en muchas peliculas
Director.hasMany(Movie, { as: 'movies' });

// Una pelicula tiene un director
Movie.belongsTo(Director, { as: 'director' });

// Un actor puede participar en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});

// Una pelicula tiene muchos actores
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});

// movieActor -> Movie
Movie.belongsToMany(Actor, {foreignKey: 'actorId', as: 'actors', through: 'movies_actors' });

// movieActor -> Actor
Actor.belongsToMany(Movie, {foreignKey: 'movieId', as: 'movies', through: 'movies_actors' });

Copy.belongsTo(Movie, {foreignKey: 'movieId'});

Booking.belongsTo(Member, {foreignKey: 'memberId'});
Booking.belongsTo(Copy, {foreignKey: 'copyId'});
Copy.belongsToMany(Member, {foreignKey: 'copyId', as: 'members', through: 'bookings' });
Member.belongsToMany(Copy, {foreignKey: 'memberId', as: 'copies', through: 'bookings' });

// Sincronizar la base de datos
sequelize.sync({ force: true }).then(() => {
    console.log('Tablas sincronizadas');
});

module.exports = { Director, Genre, Movie, Actor, MovieActor, Copy, Member, Booking };