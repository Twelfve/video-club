const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//schema
const schema = mongoose.Schema({
    _number:Int,
    _status:{
        type:String,
        enum: ['AVIALABLE','RENTED'],
        default: 'AVIALABLE'
    },
    _format:{
        type:String,
        enum: ['VHS','DVD','BLURAY'],
        default: 'DVD'
    },
    _movie:{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }
});
//clase
class Copy {
    constructor(number, status, format, movie){
        this._number = number;
        this._status = status;
        this._format = format;
        this._movie = movie;
    }

    get number(){
        return this._number
    }

    set number(n){
        this.number = n;
    }

    get status(){
        return this._status
    }

    set status(n){
        this._status = n;
    }
    get format(){
        return this._format
    }

    set format(n){
        this._format = n;
    }
    get movie(){
        return this._movie
    }

    set movie(n){
        this._movie = n;
    }
}

schema.loadClass(Copy);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Copy', schema);