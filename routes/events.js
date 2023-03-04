const express = require('express');
const router = express.Router();
const eventModel = require('../models/events');
const userModel = require('../models/users');

// post method
router.post('/post:/username', async (req, res) => {
    const username = req.params.username;
    
    const data = new eventModel({
        user: username,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        description: req.body.description
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get all method
router.get('/getEvents:/username', async (req, res) => {
    try {
        const data = await eventModel.find({"user": req.params.username}).exec((err, user) => {
            if(err) console.log(JSON.stringify(err));
            else if (user) res.json(data);
        });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// get by ID method
router.get('/getEvent/:id', async (req, res) => {
    try {
        const data = await eventModel.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// update by id method
router.patch('/updateEvent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = { new: true };
        const result = await eventModel.findByIdAndUpdate(id, updateData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// delete by ID method
router.delete('/deleteEvent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await eventModel.findByIdAndDelete(id);
        res.send(`User with ${data.title} has been deleted.`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;