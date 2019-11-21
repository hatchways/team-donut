// Nicole's backend

const User = require('../models/User');
const Fund = require('../models/Fund');

module.exports = {
    funds: (id, params) => {   
        return new Promise((resolve, reject) => {
            User.findOne({_id: id})
            .then(user => {

                let newFunds = new Fund({
                    user: user._id,
                    name: params.obj.babyName,
                    description: params.obj.details,
                    goal: params.obj.goal,
                    timezone: params.obj.timeZone,
                    photo: params.obj.photos
                })

                newFunds.save()
                .then(savedFund => {
                    user.funds.push(savedFund)

                    user.save()
                    .then(() => resolve(savedFund))
                    .catch(err => {
                        reject(err)
                    })
                })
                .catch(err => {
                    reject(err)
                })           
                
            }) 
            .catch(err => {
                reject(err)
            })
        })  

    }
}