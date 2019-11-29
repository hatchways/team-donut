const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profilePic: { type: String, default: '' },
    name: { type: String, default: ''}
})

module.exports = mongoose.model('requests', RequestSchema);