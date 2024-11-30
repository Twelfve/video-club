const mongoose = require('mongoose');

//schema
const schema = mongoose.Schema({
    _description:String
});
//clase
class Genre {
    constructor(description){
        this._description = description;
    }

    get description(){
        return this._description
    }

    set description(n){
        this._description = n;
    }

}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema);