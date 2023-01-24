const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = model('User', UserSchema);