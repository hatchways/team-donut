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
                    deadline: params.deadline,
                    timezone: params.obj.timeZone,
                    photo: params.obj.photos
                })

                newFunds.save()
                .then(savedFund => {
                    user.funds.push(savedFund)
                    user.save()
                    .then(() => {
                        resolve(savedFund)
                    })
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

    },

    getFunds: (id) => {       
        return new Promise((resolve, reject) => {
            User.findOne({_id: id})
            .populate('funds', '-user_id -__v')
            .exec((err, user) => {
                err ? reject(err) : resolve(user)
            })
        })
    },

    getFundDetails: (id) => {
        return new Promise((resolve, reject) => {
            Fund.findOne({_id: id})
            .then(result => resolve(result))
            .catch(err => reject(err))
        })
    },

    updateFund: (id, details) => {
        return new Promise((resolve, reject) => {
            User.findOne({_id: id})
            .then(() => {
                Fund.findOneAndUpdate(
                    {_id: details.id}, 
                    {$set: {description: details.currentState}},
                    {new: true})
                    .then(result => {
                        resolve(result)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    addPhotos: (id, pics) => {
        return new Promise((resolve, reject) => {
            User.findOne({_id: id})
            .then(() => {
                Fund.findOne({_id: pics.id})
                .then(result => {

                    let picArray = pics.pic
                    for(let i = 0; i < picArray.length; i++) {
                        result.photo.push(picArray[i])
                    }

                    result.save()
                    .then(savedPics => {
                        resolve(savedPics)
                    }) 
                    .catch(err => reject(err))   

                })
                .catch(err => reject(err))
            })
        })
    }
}