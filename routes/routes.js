const express = require('express');
const router = express.Router();
const Model = require('../models/users');

// post method
router.post('/post', async (req, res) => {
    const data = new Model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get all method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// get by ID method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// update by id method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(id, updateData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ messsage: error.message });
    }
});

// delete by ID method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`User with ${data.username} has been deleted.`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;