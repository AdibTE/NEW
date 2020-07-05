const mongoose = require('mongoose');

const userTypesSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    refrence:{
        type: Number,
        required: true,
        unique:true
    }
});

module.exports = mongoose.model('UserTypes',userTypesSchema)