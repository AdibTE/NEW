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
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        star: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Star',
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            default: '5f021ca15dd78111c8b24229'
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
