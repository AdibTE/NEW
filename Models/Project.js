const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        ID: Number,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        auditionText: String,
        category: {
            type: Number, // @ref: 'Category'
            required: true
        },
        starsNeed: {
            type: Number, // @ref: 'Star'
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
            type: Number, // @ref: 'Status',
            default: 100
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
    },
    { versionKey: false }
);

module.exports = mongoose.model('Project', projectSchema);
