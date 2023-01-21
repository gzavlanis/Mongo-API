const express = require('express');
const router = express.Router();
const connection  = require('../../database');
const db = connection.getDb();

function getNextSequenceValue(sequenceName) {
    let sequenceDocument = db.counters.findAndModify({
        query: {id: sequenceName},
        update: {$inc: {sequence_value: 1}},
        new: true
    });
    return sequenceDocument.sequence_value;
}

// show all users
router.get('/', async (req, res) => {
    await db.collection("users").find({}).toArray((err, result) => {
        if (err) throw err;
        if (result.length) {
            res.send(result);
        } else {
            res.send('There are no users here yet.');
        }
    });
});

// show specific user
router.get('/:id', async (req, res) => {
    id = parseInt(req.params.id);
    const query = {id : id};
    await connection.dbo.collection("users").find(query).toArray((err, result) => {
        if (err) throw err;
        if (result.length) {
            res.send(result);
        } else {
            res.send('User not found');
        }
    });
});

// create a new user
router.post('/', async (req, res) => {
    const { first_name, last_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).send('You have empty field! Try again.');
    }
    const user = {id: getNextSequenceValue("user_id"), first_name: first_name, last_name: last_name, email: email};
    await connection.dbo.collection("users").isertOne(user, (err, res) => {
        if (err) throw err;
        res.send('User created');
    });
});

// update a user
router.put('/:id', async (req, res) => {
    id = parseInt(req.params.id);
    const {first_name, last_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).send('You have empty fields! Try again.');
    }
    const query = {id: id};
    const newData = {$set: {first_name: first_name, last_name: last_name, email: email}};
    await connection.dbo.collection("users").updateOne(query, newData, (err, res) => {
        if (err) throw err;
        res.send('User updated');
    });
});

// delete user
router.delete('/:id', async (req, res) => {
    id = parseInt(req.params.id);
    const query = {id: id};
    await connection.dbo.collection("users").deleteOne(query, (err, res) => {
        if (err) throw err;
        res.send('User deleted');
    });
});

module.exports = router;