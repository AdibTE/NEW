const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema(
    {
        title: {
            type: String,
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

module.exports = mongoose.model('UserType', userTypeSchema);
