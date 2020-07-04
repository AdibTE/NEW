const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    type:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    registerDate:{
        type: Date,
        require: true,
        default: Date.now
    },
});

module.exports = mongoose.model('User',userSchema)