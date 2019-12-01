// Nicole's backend

const User = require('../models/User');
const Fund = require('../models/Fund');
const Requests = require('../models/Requests');

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
                        console.log(err)
                        reject(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })           
                
            }) 
            .catch(err => {
                console.log(err)
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

    getFundDetails: (userID, fundID) => {
        return new Promise((resolve, reject) => {
            console.log(userID, fundID);

            User.findOne({_id: userID})
            .then(() => {
                Fund.findOne({_id: fundID})
                .then(result => resolve(result))
                .catch(err => reject(err))
            })
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
    },

    requestFund: (id, idObj) => {
        return new Promise((resolve, reject) => {
            
            // Target the Fund model
            // push which userID is doing the request
                // push the userID into THEIR request array in the fund model

            Fund.findOne({_id: idObj.theirFundID})
            .then(theirs => {     
                console.log(theirs)         

                // User.findOne({_id: id})
                // .then(user => {
                //     theirs.requests.push(user)

                //     theirs.requests.map(item => {
                //         console.log(item)
                        
                //         User.findOne({_id: item})
                //         .then(result => {
                //             console.log(result)
                //             resolve(result)
                //         })
                //         .catch(err => {
                //             console.log(err)
                //             reject(err)
                //         })
                //     })

                //     theirs.save()
                //     .then(saved => {
                //         console.log(saved)
                //         resolve(saved)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //         reject(err)
                //     })
                // })
                // .catch(err => reject(err))
                
            })
            .catch(err => reject(err))
        })
    }
}