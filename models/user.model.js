const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _name: {
        type: String,
        required: true
    },
    _lastName: {
        type: String,
        required: true
    },
    _email: {
        type: String,
        required: true
    },
    _password: {
        type: String,
        required: true
    },
    _salt: {
        type: String,
        required: true
    },
});

class User {
    constructor(name, lastName, email, password, salt) {
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._salt = salt;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get salt() {
        return this._salt;
    }

    set salt(value) {
        this._salt = value;
    }
}

userSchema.loadClass(User);
module.exports = mongoose.model('User', userSchema);