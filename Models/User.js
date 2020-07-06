const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: Number, // @ref UserType
            required: true
        },
        password: {
            type: String,
            required: true
        },
        registerDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
