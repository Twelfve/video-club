const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    _description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['READ', 'CREATE', 'UPDATE', 'DELETE'], // Define allowed enum values
        required: true
    }
});

class Permission{
    constructor(description, type){
        this._description = description;
        this.type = type;
    }

    get description(){
        return this._description;
    }

    get type(){
        return this.type;
    }

    set description(description){
        this._description = description;
    }

    set type(type){
        this.type = type;
    }
}

permissionSchema.loadClass(Permission);

module.exports = mongoose.model('Permission', permissionSchema);