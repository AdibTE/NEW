const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    type:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    registerDate:{
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('User',userSchema)