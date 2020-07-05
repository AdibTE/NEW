const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    star: {
        type: Number, // @ref Star Model
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    forceTime: {
        type: Date,
        required: true
    },
    status: {
        type: Number, // @ref Status Model
        default: 0
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    submitDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
