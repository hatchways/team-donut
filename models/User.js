const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

//Define a schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic: {
        type: String,
        default: ''
    },
    funds: [{
        type: Schema.Types.ObjectId,
        ref: 'fund'
    }]
});

//hash user password before using into database
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;