var express = require("express");
var router = express.Router();

router.post('/login', (req, res) => {
    userController.login(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})