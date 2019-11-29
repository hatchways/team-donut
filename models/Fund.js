//This code is of Fund-Model#10 branch
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FundSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    timezone: {
        type: String,
        required: true
    },
    photo: {
        type: [String]
    },
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'requests'
    }],
    access: [{
        type: Schema.Types.ObjectId,
        ref: 'access'
    }]
});

const Fund = mongoose.model('fund', FundSchema);

module.exports = Fund;
