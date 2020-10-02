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
        attachments: [
            {
                type: String
            }
        ],
        tags: [ {} ],
        applyFile: String, // @type File
        applyFilePreview: String, // @type File
        applyFeedBack: String, // @type File
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
        bannedApplicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        submitDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    { versionKey: false, usePushEach: true }
);

module.exports = mongoose.model('Project', projectSchema);
