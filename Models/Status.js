const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    step:{
        type: Number,
        required: true,
        unique:true
    }
});

module.exports = mongoose.model('Status',statusSchema)