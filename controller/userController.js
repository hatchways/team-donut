const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (params) => {
        return new Promise((resolve, reject) => {
            User.findOne({email: params.email})
            .then(user => {

                if(user) {
                    let error = {}
                    error.message = 'Your account exists. Please log in.'
                    error.status = 409
                    reject(error)
                } else {
                    const newUser = new User({
                        name: params.name,
                        email: params.email,
                        password: params.password
                    });

                    newUser.save()
                    .then(savedUser => {
                        resolve(savedUser)
                    })
                    .catch(err => {
                        reject(err)
                    })

                }
            })
            .catch(error => reject(error))
        })

    },

    login: (params) => {
        console.log(params);
        
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
                    console.log(isMatch)
                    
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                            username: user.name
                        };

                        jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) { reject(err) }
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
                .catch(err => console.log(JSON.stringify(err)))
            })
            .catch(err => console.log(JSON.stringify(err)))
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