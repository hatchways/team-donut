const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {
    login: (params) => {
        const email = params.email;
        const password = params.password;

        return new Promise((resolve, reject) => {
            User.findOne({email})
            .then(user => {
                if(!user) {
                    let errors = {}
                    errors.email = "User not found";
                    errors.status = 400;
                    reject(errors)
                }
                bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                            username: user.name
                        };

                        jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) {
                                console.log(err)
                                reject(err)
                            }
                            let success = {}
                            success.confirmation = true;
                            success.token = `Bearer ${token}`
                            resolve(success)
                        });
                    } else {
                        let errors = {}
                        errors.password = 'Password incorrect';
                        errors.status = 400;
                        reject(errors);
                    }
                })
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        })
    },

    allUsers: () => {
        return new Promise((resolve, reject) => {
            User.find()
            .then(users => resolve(users))
            .catch(err => reject(err))
        })
    }
}