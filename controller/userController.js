const User = require('../models/User')

module.exports = {
    login: (params) => {
        return new Promise((resolve, reject) => {
            console.log(params)
        })
    }
}