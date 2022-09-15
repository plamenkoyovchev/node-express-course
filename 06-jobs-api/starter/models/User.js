const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: 3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
        maxlength: 12
    }
});

module.exports = mongoose.model('User', UserSchema);