const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//schema
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});
//clase
class Actor {
    constructor(name,lastName){
        this._name = name;
        this._lastName = lastName;
    }

    get name(){
        return this._name
    }

    set name(n){
        this._name = n;
    }
    get lastName(){
        return this._lastName
    }

    set lastName(n){
        this._lastName = n;
    }

}

schema.loadClass(Actor);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Actor', schema);