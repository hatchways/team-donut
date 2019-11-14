const mongoose = require('mongoose');

const FundSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    goal:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        default: Date.now
    }
});

const Fund = mongoose.model('fund', FundSchema);

module.exports = Fund;