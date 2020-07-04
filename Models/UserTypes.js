const mongoose = require('mongoose');

const userTypesSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    refrence:{
        type: Number,
        require: true,
        unique:true
    }
});

module.exports = mongoose.model('UserTypes',userTypesSchema)