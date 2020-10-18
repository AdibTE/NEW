const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        picture: {
            type : String,
            required: true            
        },
        ID: {
            type: Number,
            required: true,
            unique: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Category', categorySchema);
