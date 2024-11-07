const mongoose = require('mongoose');

// Schema
const movieSchema = new mongoose.Schema({
    _title: {
        type: String,
        required: true
    },
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    },
});

// Class
class Movie{
    constructor(title, director){
        this._title = title;
        this._director = director;
    }

    // Getters
    
    get title(){
        return this._title;
    }

    get director(){
        return this._director;
    }

    // Setters

    set title(title){
        this._title = title;
    }

    set director(director){
        this._director = director;
    }
}

movieSchema.loadClass(Movie);

module.exports = mongoose.model('Movie', movieSchema);