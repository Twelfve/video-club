const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//schema
const schema = mongoose.Schema({
    _date:Date,
    _member:{
        type: mongoose.Schema.ObjectId,
        ref: 'Member'
    },
    _copy:{
        type: mongoose.Schema.ObjectId,
        ref: 'Copy'
    }
});
//clase
class Booking {
    constructor(date, member, copy){
        this._date = date;
        this._member = member;
        this._copy = copy;
    }

    get date(){
        return this._date
    }

    set date(n){
        this._date = n;
    }

    get member(){
        return this._member
    }

    set member(n){
        this._member = n;
    }
    get copy(){
        return this._copy
    }

    set copy(n){
        this._copy = n;
    }
}

schema.loadClass(Booking);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Booking', schema);