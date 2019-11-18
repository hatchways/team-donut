const express = require('express');
const router = express.Router();
const fundModel = require('../../../models/Fund');
const auth = require('../../../middleware/auth');

//Create Fund
router.post('/create', auth, async (req, res) => {
    const { name, description, goal, deadline, photo } = req.body;
    console.log(req.user.id);
    
  
    try {
        const createFund = new fundModel({
            user: req.user.id,
            name,
            description,
            goal,
            deadline,
            photo
        });
        const created = await createFund.save();
        console.log(createFund);
        
        res.send(created);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

//Update Fund
router.put('/update', auth, async (req, res) => {

    const { id, name, description, goal, deadline, photo } = req.body;
    try {
        //Finding the fund
        let updateFund = await fundModel.findById({ user: req.user.id, _id: id });

        if (!updateFund) {
            return res.status(404).send('Fund not found');
        }

        //Update the found fund
        updateFund = await fundModel.findByIdAndUpdate(
            { _id: id },
            {
                name,
                description,
                goal,
                deadline,
                photo
            });
        res.send(updateFund);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

//Get all the funds by user
router.get('/myfunds', auth, async (req, res) => {
    try {

        const funds = await fundModel.find({ user: req.user.id });
        res.send(funds);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

//Get fund by ID
router.get('/myfunds/:id', auth, async (req, res) => {
    try {
        const fund = await fundModel.findById({ user: req.user.id, _id: req.params.id });
        if (!fund) {
            return res.status(404).send('No fund found');
        }
        res.send(fund);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;