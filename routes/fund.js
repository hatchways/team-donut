// Nicole's backend

const express = require('express');
const router = express.Router();
const fundController = require('../controller/fundController');

router.post('/create/:id', (req, res) => {
    fundController.funds(req.params.id, req.body)
    .then(fund => {
        res.json(fund)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.get('/fundinfo/:id', (req, res) => {
    fundController.getFunds(req.params.id)
    .then(fund => {
        res.json(fund)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.get('/funddetails/:id', (req, res) => {
    fundController.getFundDetails(req.params.id)
    .then(fund => {
        res.json(fund)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.put('/editfund/:id', (req, res) => {
    fundController.updateFund(req.params.id, req.body)
    .then(fund => {
        res.json(fund)
    })
    .catch(err => {
        res.status(400).json(err)
    })
});

router.post('/addphotos/:id', (req, res) => {
    fundController.addPhotos(req.params.id, req.body)
    .then(fund => {
        res.json(fund)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router;