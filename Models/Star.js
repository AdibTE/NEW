const mongoose = require('mongoose');

const starSchema = mongoose.Schema(
    {
        starCount: {
            type: Number,
            required: true,
        },
        point: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Star', starSchema);
