require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
const routes = require('./routes/routes');
const events = require('./routes/events');
app.use(express.json());
app.use('/api', routes);
app.use('/api', events);

mongoose.set('strictQuery', true);
mongoose.connect(mongoString, {dbName: 'myMongo'});
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
});
database.once('connected', () => {
    console.log('Database Connected')
});

app.listen(3000, () => {
    console.log('Server started')
});