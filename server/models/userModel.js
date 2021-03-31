const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userAge: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model('User', schema);