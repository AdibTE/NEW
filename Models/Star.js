const mongoose = require('mongoose');

const starSchema = mongoose.Schema(
    {
        starCount: {
            type: Number,
            required: true,
            unique: true
        },
        point: {
            type: Number,
            required: true,
            unique: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Star', starSchema);
