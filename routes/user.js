var express = require("express");
var router = express.Router();
var userController = require('../controller/userController')

router.post('/login', (req, res) => {
    userController.login(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.get('/allusers', (req, res) => {
    userController.allUsers()
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

module.exports = router;