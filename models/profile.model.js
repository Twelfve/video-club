const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _description: {
        type: String,
        required: true
    },
    _status: {
        type: Boolean,
        required: true
    },
    _permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to Permission schema
        required: true
    }]
});

class Profile{
    constructor(description, status, permissions){
        this._description = description;
        this._status = status;
        this._permissions = permissions;
    }

    get description(){
        return this._description;
    }

    get status(){
        return this._status;
    }

    get permissions(){
        return this._permissions;
    }

    set description(description){
        this._description = description;
    }

    set status(status){
        this._status = status;
    }

    set permissions(permissions){
        this._permissions = permissions;
    }
}

profileSchema.loadClass(Profile);
module.exports = mongoose.model('Profile', profileSchema);