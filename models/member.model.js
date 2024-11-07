const mongoose = require('mongoose');

// Schema
const memberSchema = new mongoose.Schema({
    _name: {
        type: String,
        required: true
    },
    _lastName: {
        type: String,
        required: true
    },
    _phone: {
        type: String,
        required: true
    },
    _address: {
        street: String,
        number: Number,
        zip: Number,
        city: String,
        state: String,
        country: String
    }
});

// Class
class Member{
    constructor(name, lastName, phone, address){
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address;
    }

    // Getters
    
    get name(){
        return this._name;
    }

    get lastName(){
        return this._lastName;
    }

    get phone(){
        return this._phone;
    }

    get address(){
        return this._address;
    }

    // Setters

    set name(name){
        this._name = name;
    }

    set lastName(lastName){
        this._lastName = lastName;
    }

    set phone(phone){
        this._phone = phone;
    }

    set address(address){
        this._address = address;
    }
}

memberSchema.loadClass(Member);

module.exports = mongoose.model('Member', memberSchema);