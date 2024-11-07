const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema
const directorSchema = new mongoose.Schema({
    _name: {
        type: String,
        required: true
    },
    _lastName: {
        type: String,
        required: true
    }
});

// Class
class Director{
    constructor(name, lastName, age){
        this._name = name;
        this._lastName = lastName;
    }

    // Getters
    
    get name(){
        return this._name;
    }

    get lastName(){
        return this._lastName;
    }

    // Setters

    set name(name){
        this._name = name;
    }

    set lastName(lastName){
        this._lastName = lastName;
    }
}

directorSchema.loadClass(Director);
directorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Director', directorSchema);