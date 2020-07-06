const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
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
