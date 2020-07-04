const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('contact', ContactSchema);
